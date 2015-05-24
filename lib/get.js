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
  console.log(process.argv[2]);
  console.log(process.argv[3]);
  if (typeof target !== 'string') target = '.';
  db.find(function(col) {
    if (!col.user) return console.log('Set your user: pro set user [name]');
    if (source.indexOf('.') <= -1 || process.argv[2] === '-d' || process.argv[3] === '-d' ||
        process.argv[2] === '--dot' || process.argv[3] === '--dot') {
      if (target === '.') {
        console.log('Getting "' + source + '" repository');
      } else {
        console.log('Getting "' + source + '" repository into "' + target + '" directory');
      }
      var url = 'git clone -q --depth=1 https://github.com/' + col.user + '/' + source + '.git ' + target;
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
    } else {
      if (!col.file) return console.log('Set your files: pro set files [name]');
      console.log('Getting "' + source + '" file');
      var localFile = fs.createWriteStream(path.join(process.cwd(), source));
      var url = 'https://raw.githubusercontent.com/' + col.user + '/' + col.file + '/master/' + source;
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
  });
}

module.exports = get;
