const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
  log: {
    type: String,
    required: true
  }
});

module.exports = Log = mongoose.model("log", LogSchema);
