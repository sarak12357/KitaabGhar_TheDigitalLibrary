const mongoose = require("mongoose");

const userBookSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },

  accessType: {
    type: String,
    enum: ["synopsis", "full"],
    required: true
  },

  unlockedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("UserBook", userBookSchema);