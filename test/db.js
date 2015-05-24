var assert = require('assert');
var db = require('../src/db');
var fs = require('fs');
var path = require('path');
var jsonfile = path.join(__dirname, '..', 'db.json');

describe('db#set', function() {
  it('should set user', function(done) {
    db.set('user', 'CreaturePhil');
    setTimeout(function() {
      fs.readFile(jsonfile, 'utf-8', function(err, file) {
        if (err) return done(err);
        var json = JSON.parse(file);
        assert.deepEqual(typeof json, 'object');
        assert.deepEqual(typeof json.user, 'string');
        assert.deepEqual(json.user, 'CreaturePhil');
        done();
      });
    }, 100);
  });

  it('should set file', function(done) {
    db.set('file', 'grid');
    setTimeout(function() {
      fs.readFile(jsonfile, 'utf-8', function(err, file) {
        if (err) return done(err);
        var json = JSON.parse(file);
        assert.deepEqual(typeof json, 'object');
        assert.deepEqual(typeof json.file, 'string');
        assert.deepEqual(json.file, 'grid');
        done();
      });
    }, 100);
  });
});

describe('db#find', function() {
  it('should get user', function(done) {
    db.find('user', function(user) {
      assert.deepEqual(typeof user, 'string');
      assert.deepEqual(user, 'CreaturePhil');
      done();
    });
  });

  it('should get file', function(done) {
    db.find('file', function(file) {
      assert.deepEqual(typeof file, 'string');
      assert.deepEqual(file, 'grid');
      done();
    });
  });

  it('should get the whole collection', function(done) {
    db.find(function(collection) {
      assert.deepEqual(typeof collection, 'object');
      assert.deepEqual(collection.user, 'CreaturePhil');
      assert.deepEqual(collection.file, 'grid');
      done();
    });
  });
});
