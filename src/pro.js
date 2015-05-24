#!/usr/bin/env node

'use strict';

/**
 * Module dependencies.
 */

var program = require('commander');

var get = require('./get');
var list = require('./list');
var set = require('./set');

program
  .version('2.0.0')
  .option('-d, --dot', 'Allow getting repositories that has a dot in the name')
  .usage('[file or repository]');

program
  .command('*')
  .description('Get project files or repositories')
  .action(get);

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
  .description('Get a list of all your repos')
  .action(list.repos);

program
  .command('files')
  .alias('file')
  .description('Get a list of all your files')
  .action(list.files);

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

module.exports = program;
