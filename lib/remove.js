var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

var userPath = path.join(__dirname, '..', 'user.txt');
var filePath = path.join(__dirname, '..', 'file.txt');

function remove(name) {
  name = name.toLowerCase();
  if (name === 'user') {
    fs.exists(userPath, function(exists) {
      if (!exists) return console.log(name + ' does not exist.');
      fs.unlink(userPath, function(err) {
        if (err) throw err;
        console.log('[' + chalk.bold.gray('pro') + '] ' + name + ' has been successfully removed.');
      });
    });
  } else if (name === 'files' || name === 'file') {
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
}

module.exports = remove;
