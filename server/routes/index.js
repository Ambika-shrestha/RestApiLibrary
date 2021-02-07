import Books from '../controllers/book';

export default (app) => {

app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the bookStore API!',
}));

app.post('/api/create', Books.create); // API route for create a book
app.get('/api/books', Books.list); // API route for user to get all books in the database
app.put('/api/books/:bookId', Books.modify); // API route for edit a book
app.delete('/api/books/:bookId', Books.delete); // API route for delete a book
app.post('/api/search/', Books.search); //API route for search book by name
app.get('/api/getbyid/:id',Books.findbyid);// Get it for view
};