"use strict";
module.exports = function(sequelize, Sequelize) {
  var Page = sequelize.define("Page", {
    title: Sequelize.DataTypes.STRING,
    text: Sequelize.DataTypes.TEXT,
    name: Sequelize.DataTypes.STRING,
    clientTimestamp: Sequelize.DataTypes.BIGINT,
  });
  return Page;
};
