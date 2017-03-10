# TempDB

[![npm version](https://badge.fury.io/js/tempdb.svg)](https://badge.fury.io/js/tempdb)
[![Build Status](https://travis-ci.org/shanev/tempdb.svg?branch=master)](https://travis-ci.org/shanev/tempdb)
[![codecov](https://codecov.io/gh/shanev/tempdb/branch/master/graph/badge.svg)](https://codecov.io/gh/shanev/tempdb)
[![codebeat badge](https://codebeat.co/badges/c614ab13-0067-4bec-b4af-7683d01d0434)](https://codebeat.co/projects/github-com-shanev-tempdb-master)
[![Dependencies](https://david-dm.org/shanev/tempdb.svg)](https://david-dm.org/shanev/tempdb)

TempDB is Redis-backed temporary key-value store for Node.js. It's useful for storing temporary data such as login codes, authentication tokens, and temporary passwords.

## Installation

If you are using yarn:

```sh
yarn add tempdb
```

or npm:

```sh
npm install tempdb --save
```

Run Redis server:
```sh
redis-server
```
Check out [Redis quickstart](https://redis.io/topics/quickstart) to install.

## Usage

Initialize TempDB:
```js
const TempDB = require('tempdb');

const db = new TempDB();
```

Add a key/value pair. Value is anything that can be stored as JSON. Expires (in seconds) is optional.
```js
db.add(key, value, expires);
```

Find by key:
```js
const value = await db.find(key);
```

## Debugging

Add `DEBUG=tempdb` to the node start script in `package.json` to see debug output. i.e:

```sh
DEBUG=tempdb node server.js
```

## Tests

```sh
yarn install # or npm install
npm test
```

## Author

Shane Vitarana :: [http://shanev.me](http://shanev.me) :: [@shanev](https://twitter.com/shanev)
