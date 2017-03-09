# Temp DB

TempDB is Redis-backed temporary key-value store for Node.js. It's useful for storing temporary data such as login codes and temporary passwords.

## Installation

If you are using yarn:

```sh
yarn add temp-db
```

or npm:

```sh
npm install temp-db --save
```

Run Redis server:
```sh
redis-server
```
Check out [Redis quickstart](https://redis.io/topics/quickstart) to install.

## Usage

Initialize TempDB
```js
const db = new TempDB();
```

Add a key/value pair
```js
db.add(key, value, expires);
```

Find by key
```js
const value = await db.find(key);
```

## Debugging

Add `DEBUG=temp-db` to the node start script in `package.json` to see debug output. i.e:

```sh
DEBUG=temp-db node server.js
```

## Tests

```sh
yarn install # or npm install
npm test
```

## Author

Shane Vitarana :: [http://shanev.me](http://shanev.me) :: [@shanev](https://twitter.com/shanev)
