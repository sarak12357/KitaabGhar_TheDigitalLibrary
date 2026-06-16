const Book = require("../models/Book");


// GET ALL BOOKS
exports.getBooks = async (req, res) => {

  try {

    const books = await Book.find();

    res.json(books);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET BOOK BY ID
exports.getBookById = async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);

    res.json(book);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET BOOKS BY CATEGORY
exports.getBooksByCategory = async (req, res) => {

  try {

    const books = await Book.find({
      category: req.params.category
    });

    res.json(books);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET TRENDING BOOKS
exports.getTrendingBooks = async (req, res) => {

  try {

    const books = await Book.find({
      isTrending: true
    });

    res.json(books);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

// GET TRENDING BOOKS
exports.getTrendingBooks = async (req, res) => {

  try {

    const books = await Book.find({
      isTrending: true
    });

    res.json(books);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};