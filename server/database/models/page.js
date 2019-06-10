"use strict";
module.exports = function(sequelize, Sequelize) {
  var Page = sequelize.define("Page", {
    title: Sequelize.DataTypes.STRING,
    text: Sequelize.DataTypes.TEXT,
    name: {
      type: Sequelize.DataTypes.STRING,
      validate: {
        is: {
          args: [/^[\w\-]+$/i],
          msg: 'page urls can ONLY contain numbers, letters, dashes, and underscores',
        },
      }
    },
    clientTimestamp: Sequelize.DataTypes.BIGINT,
  });
  return Page;
};
