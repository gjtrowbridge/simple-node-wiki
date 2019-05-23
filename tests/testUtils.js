const db = require('../server/database/models/index.js');

const clearDatabase = (t) => {
  let promise = Promise.resolve(0);
  Object.entries(db.models).forEach(([key, value]) => {
    promise = promise.then(() => {
      return value.destroy({
        where: {},
      });
    });
  });
  return promise.catch((err) => {
    t.fail(`unable to clear database: "${err}"`);
  });
};


module.exports = {
  clearDatabase,
};