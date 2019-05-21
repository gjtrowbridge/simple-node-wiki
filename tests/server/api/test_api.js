const test = require('tape');

test('tests work', (t) => {
  t.strictEqual(1, 1);
  t.notStrictEqual(1, 2);
  t.end();
});
