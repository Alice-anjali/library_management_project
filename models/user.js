'use strict';
module.exports = (sequelize,DataTypes) => {
  const User = sequelize.define('user',{
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  });

  User.assosiate = (models) => {};

  return User;
};
