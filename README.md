[![pro](http://i.imgur.com/92f2T1C.png)](https://www.npmjs.com/package/pro-cli)

Personal package manager that helps you to kickstart new projects.

[![NPM Version](https://img.shields.io/npm/v/pro-cli.svg)](https://www.npmjs.com/package/pro-cli)
[![NPM Downloads](https://img.shields.io/npm/dm/pro-cli.svg)](https://www.npmjs.com/package/pro-cli)
[![Build Status](https://travis-ci.org/CreaturePhil/pro.svg?branch=master)](https://travis-ci.org/CreaturePhil/pro)
[![Dependency Status](https://david-dm.org/creaturephil/pro.svg)](https://david-dm.org/creaturephil/pro)
[![devDependency Status](https://david-dm.org/creaturephil/pro/dev-status.svg)](https://david-dm.org/creaturephil/pro#info=devDependencies)

## Installation

```bash
$ npm install -g pro-cli
```

## Quick Start

Set Github username:

```bash
$ pro set user creaturephil
```

Create a directory and get repository (installs in current directory):

```bash
$ mkdir todo && cd todo
$ pro todo-boilerplate
```

## Usage

```bash
Usage: pro [file or repository]


Commands:

  *                  Get project files or repositories
  list               List your Github username or repository for files
  set <type> <name>  Set your Github username or repository for files
  repos|repo         Get a list of all your repos
  files|file         Get a list of all your files

Options:

  -h, --help     output usage information
  -V, --version  output the version number
  -d, --dot      allow getting repositories that has a dot. Example: pro creaturephil.github.io
  -n, --nodot    allow getting files that doesn't have dot. Example: pro LICENSE
  -g, --git      clone the whole git repository, keeping `.git`
```

## Guide

pro uses Github to host packages. This is because it is fast and easy to
create a new one and push it to Github for immediate use. 
The first thing you need to do is set Github username (alias: u):

```bash
$ pro set user CreaturePhil
[pro] user set to CreaturePhil
```

Then to get a repository that will install in the current directory:

```bash
$ pro alpha
Getting "alpha" repository

Done, without errors.
```

If you want to specify a directory to install to:

```bash
$ pro alpha express-project
Getting "alpha" repository into "express-project" directory

Done, without errors.
```

To set a repository for quickly installing a single file (aliases: file, f):

```bash
$ pro set files scaffold
[pro] files set to scaffold
```

Getting the file that will install in the current directory:

```bash
$ pro index.html
Getting "index.html" file

Done, without errors.
```

The difference between getting a repository or a file is specifying a dot
"__.__". `pro index` will get the index repository and `pro index.html`
will get the index.html file from your files repository. To get a repository 
with a dot __.__, use the `-d` or `--dot` option:

```bash
$ pro -d creaturephil.github.io
Getting "creaturephil.github.io" repository

Done, without errors.
```

To get a file without a dot __.__, use the '-n' or '--nodot' option:

```bash
$ pro -n LICENSE
Getting "LICENSE" file

Done, without errors.
```

Getting a repository without having to set a user:

```bash
$ pro fakesloth/buma
Getting "buma" repository

Done, without errors.
```

List your set Github username and files repository:

```bash
$ pro list
User: CreaturePhil
Files: scaffold
```

List all Github repositories (alias: repo):

```bash
$ pro repos
```

List all files (alias: file):

```bash
$ pro files
```

# License

[MIT](LICENSE)
