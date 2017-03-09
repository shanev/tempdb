const debug = require('debug')('temp-db');

const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  debug(`Error: ${err}`);
});

/**
 * Saves a key/value pair in Redis.
 */
class TempDB {
  // persist key/value pair in Redis
  static add(key, value, expires) {
    return new Promise((resolve, reject) => {
      if (key == null) {
        throw new Error('A key is required.');
      }
      if (value == null) {
        throw new Error('A value is required.');
      }
      const redisKey = `tempDB:${key}`;
      const redisValue = JSON.stringify(value);
      if (expires == null) {
        client.set(redisKey, redisValue, (err, res) => {
          if (err) { return reject(err); }
          debug(`Saved ${redisKey}/${redisValue} in Redis.`);
          return resolve(res);
        });
      } else {
        client.set(redisKey, redisValue, 'EX', expires, (err, res) => {
          if (err) { return reject(err); }
          debug(`Saved ${redisKey}/${redisValue} in Redis. Expiring in ${expires} seconds.`);
          return resolve(res);
        });
      }
    });
  }

  // TempDB.find() gets the value associated with the key
  static find(key) {
    return new Promise((resolve, reject) => {
      const redisKey = `tempDB:${key}`;
      client.get(redisKey, (err, value) => {
        if (err) { return reject(err); }
        client.del(key);
        return resolve(JSON.parse(value));
      });
    });
  }
}

module.exports = TempDB;
