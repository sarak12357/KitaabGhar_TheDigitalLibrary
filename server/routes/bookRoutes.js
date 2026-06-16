const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

router.get("/trending", async (req, res) => {
  try {
    const books = await Book.find().limit(10);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trending books" });
  }
});

router.get("/category/:type", async (req, res) => {
  try {
    const books = await Book.find({
      category: req.params.type,
    });

    res.json(books);
  } catch (err) {
    console.error("CATEGORY ERROR:", err);
    res.status(500).json({ message: "Error fetching category books" });
  }
});

router.post("/unlock", auth, async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 FROM TOKEN
    const { bookId, type } = req.body;

    const user = await User.findById(userId);

    const cost = type === "full" ? 20 : 5;

    if (user.credits < cost) {
      return res.status(400).json({ message: "Not enough credits" });
    }

    const exists = user.unlockedBooks.some(
      (b) =>
        b.bookId === bookId &&
        b.type === type
    );

    if (exists) {
      return res.json({
        message: "Already unlocked",
        credits: user.credits
      });
    }

    user.unlockedBooks.push({ bookId, type });
    user.credits -= cost;

    await user.save();

    res.json({
      message: "Unlocked successfully",
      credits: user.credits
    });

  } catch (err) {
    res.status(500).json({ message: "Unlock failed" });
  }
});

router.get("/readlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const books = await Book.find({
      _id: { $in: user.readlist }
    });

    res.json(books);

  } catch (err) {
    res.status(500).json({ message: "Error fetching readlist" });
  }
});

router.post("/readlist", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const user = await User.findById(userId);

    if (!user.readlist.includes(bookId)) {
      user.readlist.push(bookId);
      await user.save();
    }

    res.json({
      message: "Added to readlist",
      readlist: user.readlist
    });

  } catch (err) {
    res.status(500).json({ message: "Error adding to readlist" });
  }
});

router.post("/readlist", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const user = await User.findById(userId);

    if (!user.readlist.includes(bookId)) {
      user.readlist.push(bookId);
      await user.save();
    }

    res.json({
      message: "Added to readlist",
      readlist: user.readlist
    });

  } catch (err) {
    res.status(500).json({ message: "Error adding to readlist" });
  }
});

// ✅ Public: Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    console.error("GET BOOK ERROR:", err);
    res.status(500).json({ message: "Error fetching book" });
  }
});
module.exports = router;
