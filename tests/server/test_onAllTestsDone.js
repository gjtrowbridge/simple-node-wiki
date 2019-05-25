const test = require('tape');
const db = require('../../server/database/models/index');

// Will run at the end of all tests
// This prevents the tests from hanging for an extra 10 seconds
// because the db connection stays open
test.onFinish(() => {
  db.sequelize.close();
});