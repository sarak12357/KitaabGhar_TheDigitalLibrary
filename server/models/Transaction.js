const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },

  creditsUsed: {
    type: Number,
    required: true
  },

  type: {
    type: String,
    enum: ["synopsis", "full"]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Transaction", transactionSchema);