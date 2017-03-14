const debug = require('debug')('tempdb');

const redis = require('redis');

/**
 * Saves an expiring (or non-expiring) key/value pair in Redis.
 */
class TempDB {
  /**
   * Initializes a new TempDB object.
   * Optionally takes in a Redis config (https://github.com/NodeRedis/node_redis#rediscreateclient).
   */
  constructor(config = null) {
    this.client = (config != null) ? redis.createClient(config) : redis.createClient();
  }

  // add() persists a key/value pair with an optional expiration time
  add(key = null, value = null, expires = null) {
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
        this.client.set(redisKey, redisValue, (err, res) => {
          if (err) { reject(err); }
          debug(`Saved ${redisKey}/${redisValue} in Redis.`);
          resolve(res);
        });
      } else {
        this.client.set(redisKey, redisValue, 'EX', expires, (err, res) => {
          if (err) { reject(err); }
          debug(`Saved ${redisKey}/${redisValue} in Redis. Expiring in ${expires} seconds.`);
          resolve(res);
        });
      }
    });
  }

  // find() gets the value associated with the key
  find(key) {
    return new Promise((resolve, reject) => {
      const redisKey = `tempDB:${key}`;
      this.client.get(redisKey, (err, value) => {
        if (err) { reject(err); }
        this.client.del(key, (error) => {
          if (error) { reject(error); }
        });
        resolve(JSON.parse(value));
      });
    });
  }
}

module.exports = TempDB;
