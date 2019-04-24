var assert = require('assert');

// Create a group of tests about Arrays
describe('Array', () => {
  // Within our Array group, Create a group of tests for indexOf
  describe('#indexOf()', () => {
    // A string explanation of what we're testing
    it('should return -1 when the value is not present', () => {
      // Our actual test: -1 should equal indexOf(...)
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
