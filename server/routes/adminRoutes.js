const express = require('express');
const router = express.Router();

const adminMiddleware = require('../middleware/adminMiddleware');
const Book = require('../models/Book');
const User = require('../models/User');

// Get all books
router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add book
router.post('/books', async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      cover,
      synopsis,
      content,
      synopsisPrice,
      fullPrice,
      isTrending
    } = req.body;

    // ✅ Validate required fields
    if (!title || !author || !category) {
      return res.status(400).json({
        message: "Title, Author, and Category are required"
      });
    }

    const newBook = new Book({
      title,
      author,
      category,
      cover,
      synopsis,
      content,
      synopsisPrice: Number(synopsisPrice),
      fullPrice: Number(fullPrice),
      isTrending
    });

    await newBook.save();

    res.json(newBook);

  } catch (error) {
    console.error("BOOK ERROR:", error); // 👈 IMPORTANT
    res.status(500).json({ message: error.message });
  }
});

// Delete book
router.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Update book
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get unlock activity
router.get('/activity', async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find();

    let activity = [];

    users.forEach(user => {
      user.unlockedBooks?.forEach(unlock => {
        const book = books.find(
          b => String(b._id) === String(unlock.bookId)
        );

        if (book) {
          activity.push({
            user: user.name,
            book: book.title,
            type: unlock.type
          });
        }
      });
    });

    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;