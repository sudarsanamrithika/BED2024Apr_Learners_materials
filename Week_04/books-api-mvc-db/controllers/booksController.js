const Book = require(".../models/book");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving books");
    }
};

const getBookById = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await Book.getBookById(bookid);
        if (!book) {
            return res.status(404).send("BOOK NOT FOUND");
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR RETRIEVING BOOK");
    }
};

module.exports = {
    getAllBooks,
    getBookById,
};