const assert = require('assert');

const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

const TempDB = require('../tempdb');

describe('TempDB', () => {
  const key = 'key';
  const value = 'value';
  const expires = 1; // one second

  before(() => {
    client.flushdb();
  });

  describe('#add()', () => {
    it('should save a key/value pair', (done) => {
      TempDB.add(key, value, expires).then((res) => {
        assert(res);
        done();
      });
    });
  });

  describe('#find()', () => {
    it('should find a value by key', (done) => {
      TempDB.find(key).then((res) => {
        assert.equal(value, res);
        done();
      });
    });

    it('should not find an expired value by key', (done) => {
      setTimeout(() => {
        TempDB.find(key).then((res) => {
          assert.equal(null, res);
          done();
        });
      }, 1500);
    });
  });
});
