// Set up database
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// Define database models
var models = {};

// Page
var definePage = require('./models/definePage.js');
models.Page = definePage(Sequelize, sequelize);

// TODO: User

// models.Page.sync({force: true}).then(function() {
//   return models.Page.create({
//     name: 'home',
//     title: 'Home',
//     text: 'This is the home page.'
//   });
// });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: models
};
