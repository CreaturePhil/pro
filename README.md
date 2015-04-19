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

## Docs

Set Github username:

```js
$ pro set user creaturephil
```

Get project directory (installs in current directory):

```js
$ pro bootstrap
```

Set repository for files: (must set username first)

```js
$ pro set files files
```

Get file (installs in current directory):

```js
$ pro index.html
```

List repositories and files location:

```js
$ pro list
```

List repositories:

```js
$ pro repos
```

List files:

```js
$ pro files
```

# License

[MIT](LICENSE)
