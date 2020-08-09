const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InstanceScehma = new Schema({
  _id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  status: {
      type: String
  },
  dateA: {
      type: String
  }
});

module.exports = Instance = mongoose.model("instance", InstanceScehma);
