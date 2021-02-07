'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the title for your book'
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter an author'
      }
    },
    p_date: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Pease input a description'
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Pease input a ISBN'
      }
    },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {});
  return Book;
};