const { promisify } = require('util');

/**
 * Saves an expiring (or non-expiring) key/value pair in Redis.
 */
class TempDB {
  /**
   * Initializes a new TempDB object.
   * Takes in a Redis client (https://github.com/NodeRedis/node_redis).
   */
  constructor(redis) {
    this.del = promisify(redis.del).bind(redis);
    this.get = promisify(redis.get).bind(redis);
    this.set = promisify(redis.set).bind(redis);
  }

  // set() persists a key/value pair with an optional expiration time
  async add(key = null, value = null, expires = null) {
    if (key == null) {
      throw new Error('A key is required.');
    }
    if (value == null) {
      throw new Error('A value is required.');
    }
    const redisKey = `tempDB:${key}`;
    const redisValue = JSON.stringify(value);
    const res = (expires == null) ?
      await this.set(redisKey, redisValue) :
      await this.set(redisKey, redisValue, 'EX', expires);
    return res;
  }

  // find() gets the value associated with the key
  async find(key) {
    const redisKey = `tempDB:${key}`;
    const value = await this.get(redisKey);
    return JSON.parse(value);
  }

  // findAndDelete() gets the value associated with the key and deletes it
  async findAndDelete(key) {
    const redisKey = `tempDB:${key}`;
    const value = await this.get(redisKey);
    await this.del(redisKey);
    return JSON.parse(value);
  }
}

module.exports = TempDB;
