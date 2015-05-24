var fs = require('fs');
var path = require('path');

var jsonfile = path.join(__dirname, '..', 'db.json');

module.exports = {
  /**
   * Get a value or the whole collection in the database.
   *
   * @example
   * find('user', function(value) {
   *   // do something with `value` here
   * });
   *
   * find(function(collection) {
   *   // do something with the `collection` here
   * });
   *
   * @param {String|Function} action
   * @param {Function} cb
   * @returns {undefined}
   */
  find: function(action, cb) {
    fs.exists(jsonfile, function(exists) {
      if (!exists) {
        if (cb) return cb();
        if (typeof action === 'function') return action({});
      }

      fs.readFile(jsonfile, 'utf-8', function(err, file) {
        if (err) throw err;
        var json = JSON.parse(file);
        if (typeof action === 'function') {
          return action(json);
        }

        cb(json[action]);
      });
    });
  },

  /**
   * Set a key to a value in the database.
   *
   * @example
   * set('user', 'CreaturePhil'); // In database: {"user": "CreaturePhil"}
   * set('file', 'grid'); // In database: {"user": "CreaturePhil", "file": "grid"}
   *
   * @param {String} key
   * @param {String} value
   * @returns {undefined}
   */
  set: function(key, value) {
    fs.exists(jsonfile, function(exists) {
      if (!exists) {
        var obj = {};
        obj[key] = value;
        return fs.writeFile(jsonfile, JSON.stringify(obj));
      }

      fs.readFile(jsonfile, 'utf-8', function(err, file) {
        if (err) throw err;
        if (!file) file = '{}';
        var json = JSON.parse(file);
        json[key] = value;
        fs.writeFile(jsonfile, JSON.stringify(json));
      });
    });
  }
};
