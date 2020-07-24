const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authors: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true
  },
  callno: {
    type: String,
    required: true
  }
});

module.exports = Book = mongoose.model("books", BookSchema);
