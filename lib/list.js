var fs = require('fs');
var https = require('https');
var path = require('path');
var rimraf = require('rimraf');
var Table = require('cli-table');
var exec = require('child_process').exec;

var userPath = path.join(__dirname, '..', 'user.txt');
var filePath = path.join(__dirname, '..', 'file.txt');

var list = {
  set: listSet,
  repos: listRepos,
  files: listFiles
};

function listSet() {
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
}

function listRepos() {
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
}

function listFiles() {
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
}

module.exports = list;
