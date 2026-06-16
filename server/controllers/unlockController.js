const User = require("../models/User");
const Book = require("../models/Book");
const UserBook = require("../models/UserBook");
const Transaction = require("../models/Transaction");

exports.unlockBook = async (req, res) => {

  try {

    const { userId, bookId, type } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or Book not found" });
    }

    // Check if already unlocked
    const existingUnlock = await UserBook.findOne({
      userId,
      bookId,
      accessType: type
    });

    if (existingUnlock) {
      return res.status(400).json({ message: "Already unlocked" });
    }

    // Determine price
    const price = type === "synopsis" ? book.synopsisPrice : book.fullPrice;

    if (user.credits < price) {
      return res.status(400).json({ message: "Not enough credits" });
    }

    // Deduct credits
    user.credits -= price;
    await user.save();

    // Save unlock
    const unlock = new UserBook({
      userId,
      bookId,
      accessType: type
    });

    await unlock.save();

    // Record transaction
    const transaction = new Transaction({
      userId,
      bookId,
      creditsUsed: price,
      type
    });

    await transaction.save();

    res.json({
      message: "Book unlocked successfully",
      remainingCredits: user.credits
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};