"use strict";
module.exports = {
  up: function(migration, DataTypes) {
    return migration.createTable("Pages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.TEXT
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: function(migration, DataTypes) {
    return migration.dropTable("Pages");
  }
};