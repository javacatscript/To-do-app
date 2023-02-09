const mongoose = require("mongoose");

// defining the Schema
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },

  duedate: {
    type: Date,
  },
});

// Todo is the collection which will be using todoSchema
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
