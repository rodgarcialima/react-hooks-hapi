const { version } = require('../../package.json');

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    auth: false,
  },
  handler: (_req, h) => {
    return h.response({ version }).code(200);
  },
};
