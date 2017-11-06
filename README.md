# TempDB

[![npm version](https://badge.fury.io/js/tempdb.svg)](https://badge.fury.io/js/tempdb)
[![Build Status](https://travis-ci.org/shanev/tempdb.svg?branch=master)](https://travis-ci.org/shanev/tempdb)
[![codecov](https://codecov.io/gh/shanev/tempdb/branch/master/graph/badge.svg)](https://codecov.io/gh/shanev/tempdb)
[![codebeat badge](https://codebeat.co/badges/c614ab13-0067-4bec-b4af-7683d01d0434)](https://codebeat.co/projects/github-com-shanev-tempdb-master)
[![Dependencies](https://david-dm.org/shanev/tempdb.svg)](https://david-dm.org/shanev/tempdb)

TempDB is Redis-backed temporary key-value store for Node. It's useful for storing temporary data such as login codes, authentication tokens, and temporary passwords.

## Installation

```sh
npm install tempdb
```

Run Redis server:

Check out [Redis quickstart](https://redis.io/topics/quickstart) to install for your platform, or use one of the many cloud providers.

Depending on your Redis provider, you may need to enable keyspace events for ephemeral keys to work.

A convenience script is provided for macOS default Homebrew Redis installs:

```sh
redis-server
```
Check out [Redis quickstart](https://redis.io/topics/quickstart) to install.

## Usage

Require TempDB:
```js
const TempDB = require('tempdb');
```

Initialize TempDB, connecting to a [Redis client](https://github.com/NodeRedis/node_redis):
```js
const tempDB = new TempDB(redisClient);
```

Add a key/value pair. Value is anything that can be serialized to JSON. Expires (in seconds) is optional.
```js
tempDB.add('key', value, expires);
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
npm install
npm test
```

## Ports to other languages

* Go: [https://github.com/rafaeljesus/tempdb](https://github.com/rafaeljesus/tempdb)
