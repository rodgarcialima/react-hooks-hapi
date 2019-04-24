module.exports = {
  method: 'POST',
  path: '/logout',
  options: {
    auth: 'jwt',
  },
  handler: (_, h) => h.response().code(200),
};
