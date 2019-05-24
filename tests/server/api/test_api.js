const test = require('tape');
const testUtils = require('../../testUtils');
const app = require('../../../app.js');
const request = require('supertest');
const db = require('../../../server/database/models/index.js');

test('POST /_api/pages should create a page', async (t) => {
  try {
    const pageData = {
      title: 'This is a title',
      text: 'some text',
      name: 'some name',
    };

    await testUtils.clearDatabase(t);
    const pagesBefore = await db.models.Page.findAll();
    t.strictEqual(pagesBefore.length, 0, 'should be 0 pages at start of test');

    const res = await request(app).post('/_api/pages').send(pageData);
    console.log(res.body, res.status);

    const pagesAfter = await db.models.Page.findAll();
    t.strictEqual(pagesAfter.length, 1, 'should be 1 page after POST');
    const newPage = pagesAfter[0];
    Object.entries(pageData).forEach(([key, value]) => {
      t.strictEqual(value, newPage[key], `page's key "${key}" should have value "${value}"`)
    });
  } catch (e) {
    t.fail(e);
  }

  t.end();
});
