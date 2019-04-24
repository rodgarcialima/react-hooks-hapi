'use strict';

const jwt = require('jsonwebtoken');

function createToken(user) {
  const token = jwt.sign(
    // Payload
    {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      active: user.active,
      roles: user.roles,
    },
    // Secret
    process.env.AUTH_SECRET_KEY,
    // Algotithm
    {
      algorithm: 'HS256',
      expiresIn: '1h',
    }
  );
  return token;
}

module.exports = createToken;
