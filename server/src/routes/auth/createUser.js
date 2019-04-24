const _ = require('lodash');
const bcrypt = require('bcrypt');
const Boom = require('boom');
const Joi = require('joi');

// Models
const User = require('../../models/User');

/**
 * Returns a bcrypt encoded password
 * @param {String} password
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * User already exists validation
 * @param {*} req
 * @param {*} h
 */
async function verifyUniqueUser(req, h) {
  const found = await User.findOne({ email: req.payload.email });
  if (found) {
    throw Boom.conflict(
      'This email address is already taken. Please try another'
    );
  }
  return h.response(req.payload);
}

/**
 * User validation before save on database
 */
const createUserSchema = Joi.object({
  fullname: Joi.string()
    .min(2)
    .max(100)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  roles: Joi.array().required(),
});

module.exports = {
  method: 'POST',
  path: '/users',
  options: {
    auth: false,
    pre: [{ method: verifyUniqueUser }],
    validate: {
      payload: createUserSchema,
    },
  },
  handler: async (req, h) => {
    // Creste user
    let newUser = new User();
    newUser.fullname = req.payload.fullname;
    newUser.email = req.payload.email;
    newUser.password = await hashPassword(req.payload.password);
    newUser.active = true;
    newUser.phone = req.payload.phone;
    newUser.roles = req.payload.roles;

    // Save
    return newUser
      .save()
      .then(user => {
        // Clear password property
        return h
          .response(
            _.pick(user, [
              '_id',
              'fullname',
              'email',
              'active',
              'phone',
              'roles',
            ])
          )
          .code(201);
      })
      .catch(err => {
        throw Boom.badRequest(err);
      });
  },
};
