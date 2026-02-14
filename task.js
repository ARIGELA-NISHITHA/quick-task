const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  status: {
    type: String,
    default: "Todo"
  }
});

module.exports = mongoose.model("Task", TaskSchema);
