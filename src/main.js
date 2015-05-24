var chalk = require('chalk');
var fs = require('fs');
var https = require('https');
var path = require('path');
var rimraf = require('rimraf');
var exec = require('child_process').exec;

var userPath = path.join(__dirname, '..', 'user.txt');
var filePath = path.join(__dirname, '..', 'file.txt');

function main(source, target, cb) {
  if (typeof target !== 'string') target = '.';
  fs.exists(userPath, function(exists) {
    if (!exists) return console.log('Set your user: pro set user [name]');
    if (source.indexOf('.') <= -1) {
      console.log('Getting "' + source + '" repository');
      fs.readFile(userPath, 'utf-8', function(err, user) {
        var url = 'git clone -q --depth=1 https://github.com/' + user + '/' + source + '.git ' + target;
        exec(url, function(err, stdout, stderr) {
          if (err) throw err;
          if (target === '.') {
            rimraf(path.join(process.cwd(), '.git'), function(err) {
              if (err) throw err;
              console.log(chalk.green('\nDone, without errors.\n'));
              if (cb) cb();
            });
          } else {
            rimraf(path.join(process.cwd(), target, '.git'), function(err) {
              if (err) throw err;
              console.log(chalk.green('\nDone, without errors.\n'));
              if (cb) cb();
            });
          }
        });
      });
    } else {
      fs.exists(filePath, function(exists) {
        if (!exists) return console.log('Set your files: pro set files [name]');
        console.log('Getting "' + source + '" file');
        fs.readFile(userPath, 'utf-8', function(err, user) {
          fs.readFile(filePath, 'utf-8', function(err, file) {
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
          });
        });
      });
    }
  });
}

module.exports = main;
