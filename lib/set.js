var chalk = require('chalk');
var db = require('lowdb')('db.json');

/**
 * Checks to see if a user exists.
 *
 * @returns {Boolean}
 */
function userExists() {
  return db('user').value().length !== 0;
}

/**
 * Set a user in the database.
 *
 * @param {String} user
 * @returns {undefined}
 */
function setUser(user) {
  if (db('user').value().length === 0) {
    db('user').push(user);
  } else {
    db('user').pop();
    db('user').push(user);
  }
}

function set(type, name, cb) {
  if (type === 'user' || type === 'u') {
    setUser(name);
    console.log('[' + chalk.bold.gray('pro') + '] user set to ' + name);
  } else if (type === 'files' || type === 'file') {
    if (userExists()) {

    }
    fs.exists(userPath, function(exists) {
      if (!exists) return console.log('Set your user: pro set user [name]');
      fs.writeFile(filePath, name, function(err) {
        if (err) throw err;
        console.log('[' + chalk.bold.gray('pro') + '] files set to ' + name);
        if (cb) cb();
      });
    });
  } else {
    console.log('pro set [user or files] [name]');
  }
}

module.exports = set;
