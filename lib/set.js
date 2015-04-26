var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

var userPath = path.join(__dirname, '..', 'user.txt');
var filePath = path.join(__dirname, '..', 'file.txt');

function set(type, name) {
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
}

module.exports = set;
