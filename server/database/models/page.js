"use strict";
module.exports = function(sequelize, DataTypes) {
  var Page = sequelize.define("Page", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    name: DataTypes.STRING
  });
  return Page;
};
