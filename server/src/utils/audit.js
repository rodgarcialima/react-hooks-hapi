const Boom = require('boom');
const User = require('../models/User');

async function createdBy(req) {
  const found = await User.findById(req.auth.credentials.id);
  if (found) {
    return found;
  }
  throw Boom.badRequest('There is no user logged in');
}

module.exports = {
  createdBy,
};
