const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // BASIC VALIDATION
    if (!name || name.trim().length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // CHECK DUPLICATE
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
    });

    await user.save();

    return res.status(201).json({
      message: "Registered successfully",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    // ✅ HANDLE MONGOOSE VALIDATION ERROR (THIS IS THE MAIN FIX)
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map(e => e.message);

      return res.status(400).json({
        message: errors[0], // send first clean message
      });
    }

    // ✅ HANDLE DUPLICATE KEY
    if (err.code === 11000) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN (unchanged)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        credits: user.credits,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};