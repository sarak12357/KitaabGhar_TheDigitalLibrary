const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  cover: {
    type: String
  },

  synopsis: {
    type: String
  },

  content: {
    type: String
  },

  synopsisPrice: {
    type: Number,
    default: 5
  },

  fullPrice: {
    type: Number,
    default: 20
  },

  isTrending: {
    type: Boolean,
    default: false
  }

});

module.exports = mongoose.model("Book", bookSchema);