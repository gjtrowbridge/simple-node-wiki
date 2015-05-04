// Set up database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'server/database/database.sqlite'
});

// Define database models
var models = {};

// Page
var definePage = require('./models/definePage.js');
models.Page = definePage(Sequelize, sequelize);
models.Page.sync({force: true});

// TODO: User

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: models
};
