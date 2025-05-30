const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  platform: String,
  topic: String,
  code: String,
  notes: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
