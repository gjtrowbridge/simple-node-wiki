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
    t.strictEqual(res.status, 201, 'should have status code 201');

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

test('POST /_api/pages with duplicate name should return 400 and not create page', async (t) => {
  try {
    const pageData = {
      title: 'This is a title',
      text: 'some text',
      name: 'some name',
    };

    await testUtils.clearDatabase(t);
    const pagesBefore = await db.models.Page.findAll();
    t.strictEqual(pagesBefore.length, 0, 'should be 0 pages at start of test');

    const res1 = await request(app).post('/_api/pages').send(pageData);
    t.strictEqual(res1.statusCode, 201, 'first page saved should return 201');
    const res2 = await request(app).post('/_api/pages').send(pageData);
    t.strictEqual(res2.statusCode, 400, 'saving page with duplicate name should return 400');
    console.log('xcxc', res2.body);

    const pages = await db.models.Page.findAll();
    t.strictEqual(pages.length, 1, 'only the first page should have saved');

  } catch(e) {
    t.fail(e);
  }
  t.end();
});

test('PUT /_api/pages/:id should tiebreak using client timestamp', async (t) => {
  try {

  } catch (e) {

  }
  t.end();
});
