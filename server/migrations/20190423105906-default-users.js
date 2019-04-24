'use strict';

const bcrypt = require('bcrypt');

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async db => {
  console.log(`Migrating ${__filename}`);
  let database = null;
  try {
    database = await db._run('getDbInstance');

    await database.collection('users').insertMany([
      {
        fullname: 'Rod Lima',
        email: 'rodgarcialima@gmail.com',
        password: await bcrypt.hash('rod123', await bcrypt.genSalt(10)),
        phone: '4168939698',
        active: true,
        roles: ['ADMIN'],
      },
    ]);
    return;
  } finally {
    if (database) database.close();
  }
};

exports.down = async db => {
  let database = null;
  try {
    database = await db._run('getDbInstance');
    await database.collection('users').drop();
  } finally {
    if (database) database.close();
  }
};

exports._meta = {
  version: 1,
};
