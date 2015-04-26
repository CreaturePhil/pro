var assert = require('assert');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var pro = require('../lib/main');
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

describe('Getting repos and files', function() {
  //jscs:disable disallowMultipleVarDecl
  var alpha, index, Files;

  before(function() {
    alpha = path.join(__dirname, '../alpha');
    index = path.join(__dirname, '../index.html');
    Files = ['.gitignore', '.travis.yml', 'Gruntfile.js', 'Procfile', 'README.md', 'app', 'bin', 'config', 'package.json', 'server.js', 'test'];
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
          assert.deepEqual(files.length, 11);
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
