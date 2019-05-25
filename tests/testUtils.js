const db = require('../server/database/models/index.js');

const clearDatabase = (t) => {
  try {
    const deletionPromises = Object.entries(db.models).map(async ([key, model]) => {
      const numDeleted = await model.destroy({
        where: {},
      });
      console.log(`successfully deleted ${numDeleted} records of model "${key}"`);
    });
    return Promise.all(deletionPromises);
  } catch (e) {
    t.fail(`unable to clear database: "${err}"`);
  }
};

module.exports = {
  clearDatabase,
};