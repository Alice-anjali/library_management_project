const Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('issue',{
    book_id: {
      type: Sequelize.INTEGER,
    },
    issuer: Sequelize.STRING,
    issue_date: Sequelize.DATE,
    return_date: Sequelize.DATE
  });

  Issue.associate = (models) => {
    Issue.belongsTo(models.Books,{
      foreignKey: 'book_id',
    });
  };

  return Issue;
}
