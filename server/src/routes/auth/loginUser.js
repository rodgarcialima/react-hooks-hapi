const User = require('../../models/User');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const createToken = require('../../utils/token');
const Joi = require('joi');

/**
 * Get email and password from the payload and check if match to database
 */
async function verifyCredentials(req, h) {
  const { email, password } = req.payload;
  // Query user by email
  const found = await User.findOne({ email });
  if (found) {
    // Check if password match
    if (await bcrypt.compare(password, found.password)) {
      return h.response(found).code(200);
    }
  }
  throw Boom.badRequest('Incorrect user/password');
}

/**
 * Login validation
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
});

module.exports = {
  method: 'POST',
  path: '/login',
  options: {
    auth: false,
    // Check the user password against the database
    pre: [
      {
        method: verifyCredentials,
        assign: 'user',
      },
    ],
    validate: {
      payload: loginSchema,
    },
  },
  handler: (req, h) =>
    h.response({ token: createToken(req.pre.user) }).code(200),
};
