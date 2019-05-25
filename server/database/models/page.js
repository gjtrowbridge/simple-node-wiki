"use strict";
module.exports = function(sequelize, Sequelize) {
  var Page = sequelize.define("Page", {
    title: Sequelize.DataTypes.STRING,
    text: Sequelize.DataTypes.TEXT,
    name: {
      type: Sequelize.DataTypes.STRING,
      validate: {
        is: /^[\w\-]+$/i,
      }
    },
    clientTimestamp: Sequelize.DataTypes.BIGINT,
  });
  return Page;
};
