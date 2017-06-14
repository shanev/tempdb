# TempDB

[![npm version](https://badge.fury.io/js/tempdb.svg)](https://badge.fury.io/js/tempdb)
[![Build Status](https://travis-ci.org/shanev/tempdb.svg?branch=master)](https://travis-ci.org/shanev/tempdb)
[![codecov](https://codecov.io/gh/shanev/tempdb/branch/master/graph/badge.svg)](https://codecov.io/gh/shanev/tempdb)
[![codebeat badge](https://codebeat.co/badges/c614ab13-0067-4bec-b4af-7683d01d0434)](https://codebeat.co/projects/github-com-shanev-tempdb-master)
[![Dependencies](https://david-dm.org/shanev/tempdb.svg)](https://david-dm.org/shanev/tempdb)

TempDB is Redis-backed temporary key-value store for Node. It's useful for storing temporary data such as login codes, authentication tokens, and temporary passwords.

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

Require TempDB:
```js
const TempDB = require('tempdb');
```

Initialize TempDB, connecting to a local Redis server running on the default port:
```js
const tempDB = new TempDB();
```

Optionally pass in a [Redis configuration](https://github.com/NodeRedis/node_redis#rediscreateclient) to connect to a remote server.
```js
const tempDB = new TempDB(REDIS_CLOUD_URL);
```

Add a key/value pair. Value is anything that can be stored as JSON. Expires (in seconds) is optional.
```js
tempDB.add('key', value, expires);
```

Usage with Moment:
```js
const moment = require('moment');

const EXPIRES = moment.duration(1, 'hour').asSeconds();

tempDB.add('key', value, EXPIRES);
```

Find by key:
```js
const value = await tempDB.find('key');
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

## Ports to other languages

* Go: [https://github.com/rafaeljesus/tempdb](https://github.com/rafaeljesus/tempdb)

## Author

Shane Vitarana :: [http://shanev.me](http://shanev.me) :: [@shanev](https://twitter.com/shanev)
