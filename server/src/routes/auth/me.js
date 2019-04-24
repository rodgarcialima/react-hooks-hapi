const Boom = require('boom');
const User = require('../../models/User');

module.exports = {
  method: 'GET',
  path: '/me',
  options: {
    auth: 'jwt',
  },
  handler: async (req, h) => {
    const found = await User.findById(req.auth.credentials.id)
      .select(['-password', '-__v'])
      .lean()
      .exec();
    if (found) {
      // Add token as a property to the user
      found.token = req.auth.token;
      return h.response(found).code(200);
    }
    throw Boom.badRequest('Invalid token');
  },
};
