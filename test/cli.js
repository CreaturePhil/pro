var assert = require('assert');
var fs = require('fs');
var path = require('path');
var pro = require('../lib/pro');

var dir = path.join(__dirname, '../lib/pro.js');

describe('Setting user and files', function() {
  var user, name;
  before(function(done) {
    var userDir = path.join(__dirname, '../user.txt');
    var fileDir = path.join(__dirname, '../file.txt');
    fs.exists(userDir, function(exists) {
      if (exists) {
        user = fs.readFileSync(userDir);
      }
      fs.exists(fileDir, function(exists) {
        if (exists) {
          file = fs.readFileSync(fileDir);
        }
        pro.parse(['node', dir, 'set user creaturephil']);
        pro.parse(['node', dir, 'set files grid']);
        done();
      });
    });
  });
});
