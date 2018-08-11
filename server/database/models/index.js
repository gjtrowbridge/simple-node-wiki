"use strict";

const Sequelize = require('sequelize');
const definePage = require('./page');
const defineUser = require('./user');

const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Page = definePage(sequelize, Sequelize);
const User = defineUser(sequelize, Sequelize);


module.exports = {
  Page,
  User,
  sequelize,
  Sequelize,
};
