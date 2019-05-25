const test = require('tape');
const testUtils = require('../../testUtils');
const db = require('../../../server/database/models/index.js');

test('page names must follow regex url', async (t) => {
  try {
    await testUtils.clearDatabase(t);

    const pageValid = db.models.Page.build({
      name: 'this_is_a-valid-name-12345',
    });
    const pageInvalid = db.models.Page.build({
      name: 'this is not a valid name',
    });
    let pageValidNoErrors = true;
    await pageValid.save().catch((err) => {
      pageValidNoErrors = false;
    });
    t.ok(pageValidNoErrors, 'valid page should save with no errors');

    let pageInvalidNoErrors = true;
    await pageInvalid.save().catch((err) => {
      pageInvalidNoErrors = false;
    });
    t.ok(!pageInvalidNoErrors, 'invalid page should have errors and not save');

  } catch (e) {
    t.fail(e);
  }
  t.end();
});
