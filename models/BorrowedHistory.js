const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BorrowedHistorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }, 
  date: {
    type: String,
    required: true
  }
});

module.exports = BorrowedHistory = mongoose.model("borrowedHistory", BorrowedHistorySchema);
