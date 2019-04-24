'use strict';

// Imports
const hapi = require('hapi');
const mongoose = require('mongoose');
const Boom = require('boom');
const glob = require('glob');
const Blipp = require('blipp');

// Local imports
const { isProd } = require('./utils/env');

// Load env params
const config = require('dotenv').config();
if (config.error) {
  throw config.error;
}
if (isProd()) {
  console.log(config.parsed);
} else {
  printConfig();
}

// Models
const User = require('./models/User');

// Params from .env
const {
  // Mongodb
  DBUSER,
  DBPASS,
  DBHOST,
  DBPORT,
  DBNAME,
  // Server
  PORT,
  // Mongoose
  MONGOOSE_DEBUG,
  // Auth
  AUTH_SECRET_KEY,
} = process.env;

// Mongoose
const mongoUrl = `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`;
mongoose.Promise = global.Promise;
mongoose.set('debug', MONGOOSE_DEBUG); // prints the operations mongoose sends to MongoDB to the console
mongoose.set('autoIndex', true); // set to false to disable automatic index creation for all models associated with this connection.
mongoose.set('useCreateIndex', true); // if true, this connection will use createIndex() instead of ensureIndex() for automatic index builds via Model.init()
mongoose.set('useFindAndModify', false); // true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify()
mongoose.set('useNewUrlParser', true);
mongoose.connection.once('open', () => {
  console.log('Connected to database');
});

// Server options
const hapiOptions = {
  port: PORT || 4000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['accept', 'accept-language', 'token'],
      credentials: true,
    },
    validate: {
      failAction: async (_req, _h, err) => {
        if (isProd()) {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error('ValidationError:', err.message);
          throw Boom.badRequest(`Invalid request payload input`);
        } else {
          // During development, log and respond with the full error.
          console.error(err);
          throw err;
        }
      },
    },
  },
};

// Server
const server = hapi.server(hapiOptions);

const init = async () => {
  // Mongoose
  mongoose.connect(mongoUrl);

  // Plugins
  await server.register([
    require('hapi-auth-jwt2'),
    {
      plugin: Blipp,
      options: { showStart: true, showAuth: true, showScope: false },
    },
  ]);

  // Auth config
  server.auth.strategy('jwt', 'jwt', {
    key: AUTH_SECRET_KEY,
    validate: async (decoded, _) => {
      const user = await User.findOne({ email: decoded.email })
        .select([
          '-fullname',
          '-email',
          '-password',
          '-phone',
          '-roles',
          '-__v',
        ])
        .lean()
        .exec();
      return { isValid: user !== null };
    },
    verifyOptions: { algorithms: ['HS256'] },
  });
  server.auth.default('jwt');

  // Routes
  glob
    .sync('/routes/**/*.js', {
      root: __dirname,
    })
    .forEach(file => {
      server.route(require(file));
    });

  // Init
  await server.initialize();
  return server;
};

const start = async () => {
  // Start
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

// Error
process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

function printConfig() {
  console.log('');
  console.log('###########################');
  console.log(`   RUNNING AS ${process.env.NODE_ENV}`);
  console.log(`   DBHOST: ${process.env.DBHOST}`);
  console.log(`   DBPORT: ${process.env.DBPORT}`);
  console.log(`   DBNAME: ${process.env.DBNAME}`);
  console.log('###########################');
  console.log('');
}

module.exports = { server, init, start };
