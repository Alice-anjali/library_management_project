// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('library_db','student','sycamore',{
//   dialect: 'postgres'
// });

'use strict';

// const fs = require('fs');
// const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log("Connected to database!");
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log("Connected to database!");
}

const models = {
  Admin: sequelize.import('./admin'),
  User: sequelize.import('./user'),
  Books: sequelize.import('./books'),
  Issue: sequelize.import('./issue'),
};

Object.keys(models).forEach((modelName) => {
  if('assosiate' in models[modelName]){
    models[modelName].assosiate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
