const assert = require('chai').assert;
const server = require('../../../src/server');
const request = require('http');

// server.register([
//   {
//     plugin: require('inject-then'),
//   },
// ]);

// describe('Server Testing', function() {
//   it('should validate if server is running', function() {
//     return server
//       .injectThen({
//         method: 'GET',
//         url: '/',
//       })
//       .then(function(response) {
//         assert.deepEqual(response.statusCode, 200);
//       });
//   });
//   it('should invalidate if server is running', function() {
//     return server
//       .injectThen({
//         method: 'GET',
//         url: '/',
//       })
//       .then(function(response) {
//         assert.notEqual(response.statusCode, 400);
//       });
//   });
// });
