const Sequelize = require('sequelize');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('books',{
    book_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    book_name: Sequelize.STRING,
    authors: Sequelize.ARRAY(Sequelize.STRING),
    category: Sequelize.ENUM('ADMS', 'ICS', 'DC', 'ACC'),
    issue_date: Sequelize.DATE,
    return_date: Sequelize.DATE,
    availability: Sequelize.BOOLEAN,
    library_input_date: Sequelize.DATE
  });

  Books.assosiate = (models) => {};

  return Books;
}
