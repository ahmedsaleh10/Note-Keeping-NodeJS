const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: String ,
    day: String,
    finished:Boolean,
  }
);

const Note = mongoose.model("todo", noteSchema);

module.exports = {Note}