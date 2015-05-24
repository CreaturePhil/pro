#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */

var program = require('commander');

var main = require('./main');
var list = require('./list');
var set = require('./set');
var remove = require('./remove');

program
  .version('1.3.1')
  .usage('[file or repository]');

program
  .command('*')
  .description('Get project files or repositories')
  .action(main);

program
  .command('list')
  .description('List your Github username or repository for files')
  .action(list.set);

program
  .command('set <type> <name>')
  .description('Set your Github username or repository for files')
  .action(set);

program
  .command('repos')
  .alias('repo')
  .description('Get a list of all your repos.')
  .action(list.repos);

program
  .command('files')
  .alias('file')
  .description('Get a list of all your files.')
  .action(list.files);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

