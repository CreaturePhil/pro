var chalk = require('chalk');
var db = require('./db');

/**
 * Set `user` or `file`.
 *
 * @param {String} type
 * @param {String} name
 */
function set(type, name) {
  if (type === 'user' || type === 'u') {
    db.set('user', name);
    console.log('[' + chalk.bold.gray('pro') + '] user set to ' + name);
  } else if (type === 'files' || type === 'file' || type === 'f') {
    db.find('user', function(user) {
      if (!user) return console.log('Set your user: pro set user [name]');
      db.set('file', name);
      console.log('[' + chalk.bold.gray('pro') + '] files set to ' + name);
    });
  } else {
    console.log('pro set [user or files] [name]');
  }
}

module.exports = set;
