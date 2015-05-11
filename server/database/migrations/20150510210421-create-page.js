"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Pages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      text: {
        type: DataTypes.TEXT
      },
      url: {
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
    }).done(
      function() {
        done();
      },
      function(err) {
        done(err);
      }
    );
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Pages").done(done);
  }
};