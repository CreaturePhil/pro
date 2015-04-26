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

```js
$ pro set user creaturephil
```

Create a directory and get repository (installs in current directory):

```js
$ mkdir myawesomeapp && cd myawesomeapp
$ pro Showdown-Boilerplate
```

## Usage

```bash
Usage: pro [file or repository]

Commands:

  *                  Get project files or repositories
  list               List your Github username or repository for files
  set <type> <name>  Set your Github username or repository for files
  repos              Get a list of all your repos.
  files|file         Get a list of all your files.
  remove <name>      Remove your Github username or repository for files

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## Documentation

pro uses Github to host your packages. This is because it is fast and easy to
create a new one and push it to Github for immediate use. 
The first thing you need to do is set Github username:

```js
$ pro set user CreaturePhil
[pro] user set to CreaturePhil
```

Then to get a repository that will install in the current directory:

```js
$ pro alpha
Getting "alpha" repository

Done, without errors.
```

If you want to specify a directory to install to:

```js
$ pro alpha newawesomeapp
Getting "alpha" repository

Done, without errors.
```

To set a repository for quickly installing a single file which you must set your
Github username first to do this action:

```js
$ pro set files scaffold
[pro] files set to grid
```

Getting the file that will install in the current directory:

```js
$ pro index.html
Getting "index.html" file

Done, without errors.
```

The difference between getting a repository or a file is specifying the 
character "__.__". `pro index` will get the index repository and `pro index.html`
will get the index.html file from your files repository.

List your set Github username and files repository:

```js
$ pro list
User: CreaturePhil
Files: scaffold
```

List all Github repositories:

```js
$ pro repos
```

List all files:

```js
$ pro files
```

# License

[MIT](LICENSE)
