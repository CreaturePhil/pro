var chalk = require('chalk');
var db = require('./db');
var exec = require('child_process').exec;
var fs = require('fs');
var https = require('https');
var path = require('path');
var rimraf = require('rimraf');

/**
 * Main `get` action for pro.
 *
 * @param {String} source
 * @param {String} target
 * @param {Function} cb
 */
function get(source, target, cb) {
  if (typeof target !== 'string') target = '.';
  db.find(function(col) {
    if (!col.user) return console.log('Set your user: pro set user [name]');
    if (source.indexOf('/') >= 0) {
      var parts = source.split('/');
      return getRepo(parts[1], target, parts[0], cb);
    }
    if (this.git) {
      return getGitRepo(source, target, col.user);
    }
    if (this.dot) {
      return getRepo(source, target, col.user, cb);
    }
    if (this.nodot) {
      return getFile(source, col.user, col.file, cb);
    }
    if (source.indexOf('.') <= -1) {
      getRepo(source, target, col.user, cb);
    } else {
      getFile(source, col.user, col.file, cb);
    }
  }.bind(this));
}

/**
 * Get a whole git repository keeping `.git` directory.
 *
 * @param {String} source
 * @param {String} target
 * @param {String} user
 * @returns {undefined}
 */
function getGitRepo(source, target, user) {
  if (target === '.') {
    target = '';
    console.log('Getting "' + source + '" repository');
  } else {
    console.log('Getting "' + source + '" repository into "' + target + '" directory');
  }

  var url = 'git clone -q https://github.com/' + user + '/' + source + '.git ' + target;
  exec(url, function(err, stdout, stderr) {
    if (err) throw err;
    console.log(chalk.green('\nDone, without errors.\n'));
  });
}

/**
 * Get a repository.
 *
 * @param {String} source
 * @param {String} target
 * @param {String} user
 * @param {Function} cb
 * @returns {undefined}
 */
function getRepo(source, target, user, cb) {
  if (target === '.') {
    console.log('Getting "' + source + '" repository');
  } else {
    console.log('Getting "' + source + '" repository into "' + target + '" directory');
  }

  var url = 'git clone -q --depth=1 https://github.com/' + user + '/' + source + '.git ' + target;
  exec(url, function(err, stdout, stderr) {
    if (err) throw err;
    if (target === '.') {
      rimraf(path.join(process.cwd(), '.git'), function(err) {
        if (err) throw err;
        if (typeof cb === 'function') cb();
        console.log(chalk.green('\nDone, without errors.\n'));
      });
    } else {
      rimraf(path.join(process.cwd(), target, '.git'), function(err) {
        if (err) throw err;
        if (typeof cb === 'function') cb();
        console.log(chalk.green('\nDone, without errors.\n'));
      });
    }
  });
}

/**
 * Get a file.
 *
 * @param {String} source
 * @param {String} user
 * @param {String} file
 * @param {Function} cb
 * @returns {undefined}
 */
function getFile(source, user, file, cb) {
  if (!file) return console.log('Set your files: pro set files [name]');
  console.log('Getting "' + source + '" file');
  var localFile = fs.createWriteStream(path.join(process.cwd(), source));
  var url = 'https://raw.githubusercontent.com/' + user + '/' + file + '/master/' + source;
  https.get(url, function(response) {
    if (response.statusCode === 404) throw new Error('404 Not Found');
    response.pipe(localFile);
    localFile.on('finish', function() {
      localFile.close();
      console.log(chalk.green('\nDone, without errors.\n'));
      if (cb) cb();
    });
  });
}

module.exports = get;
