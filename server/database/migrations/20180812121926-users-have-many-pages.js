'use strict';

var usersTableName = 'users';
var pagesTableName = 'Pages';

var foreignKey = 'userId';
var foreignKeyConstraintName = pagesTableName + '_' + foreignKey + '_fkey';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(pagesTableName, foreignKey, {
      type: Sequelize.DataTypes.INTEGER,
    }).then(function() {
      return queryInterface.addConstraint(pagesTableName, [foreignKey], {
        type: 'FOREIGN KEY',
        name: foreignKeyConstraintName,
        references: {
          table: usersTableName,
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeConstraint(pagesTableName, foreignKeyConstraintName).then(() => {
      return queryInterface.removeColumn(pagesTableName, foreignKey);
    });
  }
};
