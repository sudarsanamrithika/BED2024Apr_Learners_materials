const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let books = [
    { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen' },
 ];

 // parse incoming JSON data in requests
app.use(express.json())
// Configure body-parser to handle URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true })); // Set extended: true for nested objects

app.get('/books', (req, res) => {
    res.json(books); // Send the array of books as JSON response
});

// post book 
app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
});


// get one (1) book
app.get('/book/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // get book id from url parameter
    const book = books.find(book => book.id === bookId);

    if (book) {
        res.json(book); // send book data if found
    }
    else {
        res.status(404).send('book not found'); // send error if book non-existent :3
    }
});

// update book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // get book id from url params
    const updatedBook = req.body; // get updated book data from request body

    const bookIndex = books.findIndex(book => book.ud === bookId);

    if (bookIndex !== -1) {
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook; // update book data in array
        res.json(updatedBook); // send updated book
    }
    else {
         res.status(404).send('Book not found'); // send error if book non-existnet 
    }
})

// delete book
app.delete('/books/:id', (req,res) => {
    const bookId = parseInt(req.params.id); 
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1); // remove book from array
        res.status(204).send(); // send empty response with status code 204 (no content)
    }
    else {
        res.status(404).send('book not found'); // send error if book non-existnet
    }
});

app.listen(port, () => {
    console.log('server listening on port ${port}')
})

