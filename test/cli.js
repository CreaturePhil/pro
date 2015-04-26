var assert = require('assert');
var fs = require('fs');
var path = require('path');

var set = require('../lib/set');

describe('Setting user and files', function() {
  it('should have a user.txt file', function(done) {
    set('user', 'creaturephil', function() {
      fs.exists(path.join(__dirname, '../user.txt'), function(exists) {
        assert(exists, true);
        var user = fs.readFileSync(path.join(__dirname, '../user.txt'));
        assert.deepEqual(String(user), 'creaturephil');
        done();
      });
    });
  });

  it('should have a file.txt file', function(done) {
    set('file', 'grid', function() {
      fs.exists(path.join(__dirname, '../file.txt'), function(exists) {
        assert(exists, true);
        var file = fs.readFileSync(path.join(__dirname, '../file.txt'));
        assert.deepEqual(String(file), 'grid');
        done();
      });
    });
  });
});
