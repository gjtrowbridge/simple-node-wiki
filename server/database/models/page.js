"use strict";
module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define("Page", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Page;
};
