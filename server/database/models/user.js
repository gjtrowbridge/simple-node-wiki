"use strict";
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("user", {
    email: Sequelize.DataTypes.STRING,
  });
  return User;
};
