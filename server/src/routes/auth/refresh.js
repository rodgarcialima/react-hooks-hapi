const Boom = require('boom');
const User = require('../../models/User');
const createToken = require('../../utils/token');

module.exports = {
  method: 'POST',
  path: '/refresh',
  options: {
    auth: 'jwt',
  },
  handler: async (req, h) => {
    const found = await User.findById(req.auth.credentials.id)
      .lean()
      .exec();
    if (found) {
      return h.response({ token: createToken(found) }).code(201);
    }
    throw Boom.badRequest('Invalid token');
  },
};
