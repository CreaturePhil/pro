var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var pro = require('../src/get');

describe('Getting repos and files', function() {
  //jscs:disable disallowMultipleVarDecl
  var alpha, index, Files;

  before(function() {
    alpha = path.join(__dirname, '../alpha');
    index = path.join(__dirname, '../index.html');
    Files = ['.gitignore', '.jscsrc', '.travis.yml', 'Gruntfile.js', 'LICENSE',
      'Procfile', 'README.md', 'app', 'config', 'package.json', 'server.js', 'test'];
  });

  after(function(done) {
    rimraf(alpha, function(err) {
      if (err) done(err);
      fs.unlink(index, function(err) {
        if (err) done(err);
        done();
      });
    });
  });

  it('should get the repo to directory', function(done) {
    pro('alpha', 'alpha', function() {
      fs.exists(alpha, function(exists) {
        assert(exists, true);
        fs.readdir(alpha, function(err, files) {
          if (err) done(err);
          assert.deepEqual(files.length, 12);
          files.forEach(function(file, index) {
            assert.deepEqual(file, Files[index]);
          });

          done();
        });
      });
    });
  });

  it('should get the file', function(done) {
    pro('index.html', null, function() {
      fs.exists(index, function(exists) {
        assert(exists, true);
        done();
      });
    });
  });
});
