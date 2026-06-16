const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "User registered successfully",
      userId: user._id
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Register failed",
      error: err.message // 🔥 VERY IMPORTANT
    });
  }
});

// ✅ GET USER BY ID
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error("GET USER ERROR:", err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// ✅ LOGIN
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔐 GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        credits: user.credits,
        unlockedBooks: user.unlockedBooks,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

//  ADD CREDITS
router.post("/add-credits", async (req, res) => {
  try {
    const { userId, credits } = req.body;

    if (!userId || !credits) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.credits += credits;

    await user.save();

    res.json({
      message: "Credits added",
      credits: user.credits
    });

  } catch (err) {
    console.error("ADD CREDIT ERROR:", err);
    res.status(500).json({ message: "Error adding credits" });
  }
});

router.post("/readlist/add", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);

    const exists = user.readlist.find(
      (b) => String(b.bookId) === String(bookId)
    );

    if (exists) {
      return res.json({ message: "Already in readlist" });
    }

    user.readlist.push({ bookId, status: "saved" });
    await user.save();

    res.json(user.readlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/readlist/update", async (req, res) => {
  try {
    const { userId, bookId, status } = req.body;

    const user = await User.findById(userId);

    const book = user.readlist.find(
      (b) => String(b.bookId) === String(bookId)
    );

    if (book) {
      book.status = status;
      await user.save();
    }

    res.json(user.readlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;