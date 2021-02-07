import models from '../models';
const Sequelize = require('sequelize');

class Books {
  static create(req, res) {
    const { title, author, p_date, isbn } = req.body
    return models.Book
      .create({
        title:title,
        author:author,
        p_date:p_date,
        isbn: isbn
      })
      .then(book => res.status(200).send({
        message: `Your book with the title ${title} has been created successfully `,
        book
      }))
  }
  static list(req, res) {
    return models.Book
      .findAll()
      .then(books => res.status(200).send(books));
  }
  
  static findbyid(req, res) {
    return models.Book
      .findById(req.params.id)
      .then(book => res.status(200).send(book));
  }

  static modify(req, res) {
    const { title, author, p_date, isbn } = req.body
    return models.Book
      .findById(req.params.bookId)
      .then((book) => {
        book.update({
          title: title || book.title,
          author: author || book.author,
          p_date: p_date || book.p_date,
          isbn: isbn || book.isbn
        })
        .then((updatedBook) => {
          res.status(200).send({
            message: 'Book updated successfully',
            data: {
              title: title || updatedBook.title,
              author: author || updatedBook.author,
              p_date: p_date || book.p_date,
              isbn: isbn || book.isbn
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  static delete(req, res) {
    return models.Book
      .findById(req.params.bookId)
      .then(book => {
        if(!book) {
          return res.status(400).send({
          message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(200).send({
            message: 'Book successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }

  static search(req, res) {
    let name = req.body.name;
    return models.Book
    .findAll({
      where: {
        [Sequelize.Op.or]:[{
        title: {
          [Sequelize.Op.like]: '%' + name + '%'
         }
        },
         {isbn:{
          [Sequelize.Op.like]: '%' + name + '%'
         }
        },
         {author:{
          [Sequelize.Op.like]: '%' + name + '%'
         }
        },
        {p_date:{
          [Sequelize.Op.like]: '%' + name + '%'
         }
        }
        ]
      }
    }).then(books =>{ if(books != null){res.status(200).send(books)}else{
        res.status(200).send([])
    }});
  }
}

export default Books