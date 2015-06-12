#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var get = require('./get');
var list = require('./list');
var set = require('./set');

var commands = {
  set: set,
  list: list.set,
  repos: list.repos,
  repo: list.repos,
  files: list.files,
  file: list.files
};

var args = process.argv.slice(2);
if (!args.length || options('-h') || options('--help')) {
  fs.readFile(__dirname + '/help.txt', function(err, file) {
    if (err) throw new Error(err);
    console.log(file.toString()); 
  });
} else if (options('-V') || options('--version')) {
  console.log('v2.1.0');  
} else if (commands[args[0]]) {
  commands[args[0]].apply(null, args.slice(1));
} else {
  var parent = this.parent = { args: args };
  if (options('-g')) handleDots(parent, '-g');
  if (options('--git')) handleDots(parent, '--git');
  if (options('-d')) handleDots(parent, '-d');
  if (options('--dot')) handleDots(parent, '--dot');
  if (options('-n')) handleDots(parent, '-n');
  if (options('--nodot')) handleDots(parent, '--nodot');

  get.apply(parent, parent.args);
}

/**
 * Handling in dot and no dot options.
 *
 * @param {Object} parent
 * @param {String} option
 * @returns {undefined}
 */
function handleDots(parent, option) {
  if (option === '-g' || option === '--git') {
    parent.git = true;
  }
  if (option === '-d' || option === '--dot') {
    parent.dot = true;
  }
  if (option === '-n' || option === '--nodot') {
    parent.nodot = true;
  }
  parent.args.splice(args.indexOf(option), 1);
}

/**
 * Check to see if `process.argv` has an option.
 *
 * @param {String} opt
 * @returns {Boolean}
 */
function options(opt) {
  return process.argv.indexOf(opt) >= 0;
}
