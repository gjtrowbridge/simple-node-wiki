const test = require('tape');
const testUtils = require('../../testUtils');
const app = require('../../../app.js');
const request = require('supertest');

test('tests are working correctly', (t) => {
  testUtils.clearDatabase(t).then(() => {
    request(app).post('/_api/').then((res) => {
      console.log('xcxc res', res);
    });
    t.end();
  });
});
