const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController");

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", booksController.createBook);
app.put("/books/:id", booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ${port');
});

const validateBook = require("./middlewares/validateBook");

app.post("/books", validateBook, booksController.createBook); 
app.put("/books/:id", validateBook, booksController.updateBook); 