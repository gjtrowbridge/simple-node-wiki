var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './server/database.sqlite'
});

var Page = sequelize.define('page', {
  name: Sequelize.STRING,
  text: Sequelize.TEXT
}, {
  freezeTableName: true
});

Page.sync({force: true}).then(function() {
  return Page.create({
    name: 'Home',
    text: 'This is the home page.'
  });
});
