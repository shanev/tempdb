const debug = require('debug')('temp-db');

const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  debug(`Error: ${err}`);
});

// one hour (in seconds)
const EXPIRE_TIME = 3600;

/**
 * Saves a key/value pair in Redis.
 */
class tempDB {
  // TempDB.find() gets the value associated with the key
  static find(key) {
    return new Promise((resolve, reject) => {
      const key = `tempDB:${key}`;
      client.get(key, (err, value) => {
        if (err) return reject(err);
        client.del(key);
        return resolve(value);
      });
    });
  }

  constructor(key, value) {
    if ((key == null) || (value == null)) {
      throw new Error('A required argument in missing.');
    }
    this.value = value;
    this.key = `tempDB:${key}`;
  }

  // save() persists the key/value pair
  save() {
    return new Promise((resolve, reject) => {
      client.set(this.key, this.value, 'EX', EXPIRE_TIME, (err, res) => {
        if (err) return reject(err);
        debug(`[TempDB] Saved ${this.key}/${this.value} in Redis`);
        return resolve(res);
      });
    });
  }
}

module.exports = TempDB;
