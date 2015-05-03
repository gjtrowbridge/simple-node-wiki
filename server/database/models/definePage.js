
var definePage = function(Sequelize, sequelize) {
  var Page = sequelize.define('page', {
    name: Sequelize.STRING,
    text: Sequelize.TEXT
  }, {
    freezeTableName: true,
    timestamps: true
  });
  return Page;
};

module.exports = definePage;
