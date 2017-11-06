const assert = require('assert');
const redis = require('redis');
const TempDB = require('../tempdb');

const client = redis.createClient();

describe('TempDB', async () => {
  const key = 'key';
  const value = 'value';
  const expires = 1; // one second
  let tempDB = null;

  before(() => {
    client.flushdb();
  });

  describe('constructor()', () => {
    it('should connect to redis', (done) => {
      tempDB = new TempDB(client);
      assert(tempDB);
      done();
    });
  });

  describe('#add()', async () => {
    it('should save a key/value pair', async () => {
      const res = await tempDB.add(key, value);
      assert(res);
    });

    it('should save an expiring key/value pair', async () => {
      const res = await tempDB.add(key, value, expires);
      assert(res);
    });
  });

  describe('#find()', () => {
    it('should find a value by key', (done) => {
      tempDB.find(key).then((res) => {
        assert.equal(value, res);
        done();
      });
    });

    it('should not find an expired value by key', (done) => {
      setTimeout(() => {
        tempDB.find(key).then((res) => {
          assert.equal(null, res);
          done();
        });
      }, 1500);
    });
  });
});
