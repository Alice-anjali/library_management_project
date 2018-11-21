'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('books',{
    book_id: {
      type: DataTypes.INTEGER
    },
    book_name: DataTypes.STRING,
    authors: DataTypes.ARRAY(DataTypes.STRING),
    edition: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publisher:{
      type: DataTypes.STRING,
      allowNull: true
    },
    category: DataTypes.ENUM('ADBMS', 'ICS', 'DC', 'ACC'),
    issuer:{
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
    },
    availability: DataTypes.BOOLEAN,
    library_input_date: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  Books.assosiate = (models) => {};

  return Books;
}
