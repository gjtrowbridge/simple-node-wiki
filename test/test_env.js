var test = require('tape');

test('Test code runs with NODE_ENV=test', function(t) {
  t.plan(1);
  t.equal('test', process.env.NODE_ENV)
});

if (process.env.NODE_ENV === 'test') {
  // Delete test database
}
