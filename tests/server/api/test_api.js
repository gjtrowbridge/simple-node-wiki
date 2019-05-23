const test = require('tape');
const testUtils = require('../../testUtils');

test('tests are working correctly', (t) => {
  testUtils.clearDatabase(t).then(() => {
    t.strictEqual(1, 1);
    t.notStrictEqual(1, 2);
    t.end();
  });
});
