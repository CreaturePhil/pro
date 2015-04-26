#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */

var chalk = require('chalk');
var fs = require('fs');
var https = require('https');
var path = require('path');
var program = require('commander');
var rimraf = require('rimraf');
var Table = require('cli-table');
var exec = require('child_process').exec;

program
  .version('1.2.0')
  .usage('[file or repository]');

var userPath = path.join(__dirname, '..', 'user.txt');
var filePath = path.join(__dirname, '..', 'file.txt');

program
  .command('*')
  .description('Get project files or repositories')
  .action(function(source, target) {
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
              });
            } else {
              rimraf(path.join(process.cwd(), target, '.git'), function(err) {
                if (err) throw err;
                console.log(chalk.green('\nDone, without errors.\n'));
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
                });
              });
            });
          });
        });
      }
    });
  });

program
  .command('list')
  .description('List your Github username or repository for files')
  .action(function() {
    fs.exists(userPath, function(exists) {
      if (!exists) return console.log('Set your user: pro set user [name]');
      fs.readFile(userPath, 'utf-8', function(err, user) {
        if (err) throw err;
        fs.exists(filePath, function(exists) {
          if (!exists) return console.log('User: ' + user);
          fs.readFile(filePath, 'utf-8', function(err, file) {
            if (err) throw err;
            console.log('User: ' + user);
            console.log('Files: ' + file);
          });
        });
      });
    });
  });

program
  .command('set <type> <name>')
  .description('Set your Github username or repository for files')
  .action(function(type, name) {
    if (type === 'user') {
      fs.writeFile(userPath, name, function(err) {
        if (err) throw err;
        console.log('[' + chalk.bold.gray('pro') + '] user set to ' + name);
      });
    } else if (type === 'files' || type === 'file') {
      fs.exists(userPath, function(exists) {
        if (!exists) return console.log('Set your user: pro set user [name]');
        fs.writeFile(filePath, name, function(err) {
          if (err) throw err;
          console.log('[' + chalk.bold.gray('pro') + '] files set to ' + name);
        });
      });
    } else {
      console.log('pro set [user or files] [name]');
    }
  });

program
  .command('repos')
  .description('Get a list of all your repos.')
  .action(function(type, name) {
    fs.exists(userPath, function(exists) {
      if (!exists) return console.log('Set your user: pro set user [name]');
      fs.readFile(userPath, 'utf-8', function(err, user) {
        var options = {
          host: 'api.github.com',
          path: '/users/' + user + '/repos',
          method: 'GET',
          headers: {'user-agent': 'node.js'}
        };

        https.get(options, function(res) {
          var data = '';

          res.on('data', function(chunk) {
            data += chunk;
          });

          res.on('end', function() {
            var repos = JSON.parse(data);
            var table = new Table();
            var chunk = 2;

            repos = repos.map(function(repo) {
              return repo.name;
            });

            for (var i = 0, len = repos.length; i < len; i += chunk) {
              table.push(repos.slice(i, i + chunk));
            }

            console.log(table.toString());
          });
        }).on('error', function(err) {
          if (err) throw err;
        });
      });
    });
  });

program
  .command('files')
  .alias('file')
  .description('Get a list of all your files.')
  .action(function(type, name) {
    fs.exists(userPath, function(exists) {
      if (!exists) return console.log('Set your user: pro set user [name]');
      fs.exists(filePath, function(exists) {
        if (!exists) return console.log('Set your files: pro set files [name]');
        fs.readFile(userPath, 'utf-8', function(err, user) {
          fs.readFile(filePath, 'utf-8', function(err, file) {
            var url = 'git clone -q --depth=1 https://github.com/' + user + '/' + file + '.git profileslistings';
            exec(url, function(err, stdout, stderr) {
              if (err) throw err;
              var cwd = path.join(process.cwd(), 'profileslistings');
              rimraf(path.join(cwd, '.git'), function(err) {
                if (err) throw err;
                fs.readdir(cwd, function(err, files) {
                  if (err) throw err;
                  var table = new Table();
                  var chunk = 2;

                  for (var i = 0, len = files.length; i < len; i += chunk) {
                    table.push(files.slice(i, i + chunk));
                  }

                  console.log(table.toString());
                  rimraf(cwd, function(err) {
                    if (err) throw err;
                  });
                });
              });
            });
          });
        });
      });
    });
  });

program
  .command('remove <name>')
  .description('Remove your Github username or repository for files')
  .action(function(name) {
    name = name.toLowerCase();
    if (name === 'user') {
      fs.exists(userPath, function(exists) {
        if (!exists) return console.log(name + ' does not exist.');
        fs.unlink(userPath, function(err) {
          if (err) throw err;
          console.log('[' + chalk.bold.gray('pro') + '] ' + name + ' has been successfully removed.');
        });
      });
    } else if (name === 'files' || name === 'files') {
      fs.exists(filePath, function(exists) {
        if (!exists) return console.log(name + ' does not exist.');
        fs.unlink(filePath, function(err) {
          if (err) throw err;
          console.log('[' + chalk.bold.gray('pro') + '] ' + name +  ' has been successfully removed.');
        });
      });
    } else {
      console.log(name + ' does not exist.');
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

module.exports = program;
