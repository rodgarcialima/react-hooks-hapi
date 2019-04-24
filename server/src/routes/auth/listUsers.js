const Boom = require('boom');
const User = require('../../models/User');
const { getOptions, getQuery } = require('../../utils/url');

module.exports = {
  method: 'GET',
  path: '/users',
  config: {
    auth: 'jwt',
  },
  handler: async (req, h) => {
    const options = getOptions(req);
    options.select = '-password';

    const users = await User.paginate(getQuery(req), options).catch(err => {
      console.error('ERROR', err.stack);
      return Boom.badRequest(err);
    });

    return h.response(users).code(200);
  },
};
