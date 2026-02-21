const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
];


let nextId = 4;


app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    res.json(book);
});


app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
 
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    
  
    const newBook = {
        id: nextId++,
        title,
        author
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
   
    books[bookIndex] = {
        ...books[bookIndex],
        title: title || books[bookIndex].title,
        author: author || books[bookIndex].author
    };
    
    res.json(books[bookIndex]);
});


app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
  
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    
    
    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully', book: deletedBook[0] });
});


app.listen(port, () => {
    console.log(`Book API server running at http://localhost:${port}`);
});