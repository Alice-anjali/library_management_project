'use strict';
module.exports = (sequelize,DataTypes) => {
  const Admin = sequelize.define('admin',{
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
  });

  Admin.assosiate = (models) => {};

  return Admin;
};
