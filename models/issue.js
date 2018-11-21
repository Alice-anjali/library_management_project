'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('issue',{
    book_id: {
      type: DataTypes.INTEGER
    },
    issuer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    availability: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Issue.associate = (models) => {
    Issue.belongsTo(models.Books,{});
  };

  return Issue;
}
