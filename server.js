const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];

// Counter for generating new IDs
let nextId = 4;

// GET /books - Return all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - Return a specific book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    // Validate input
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    
    // Create new book
    const newBook = {
        id: nextId++,
        title,
        author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    // Find the book
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    // Update the book
    books[bookIndex] = {
        ...books[bookIndex],
        title: title || books[bookIndex].title,
        author: author || books[bookIndex].author
    };
    
    res.json(books[bookIndex]);
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Find the book
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    // Remove the book
    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully', book: deletedBook[0] });
});

// Start the server
app.listen(port, () => {
    console.log(`Book API server running at http://localhost:${port}`);
});