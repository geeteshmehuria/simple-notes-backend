const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    userId: { type: String, required: true },
    authors: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const NoteModule = mongoose.model("notes", noteSchema);

module.exports = { NoteModule };
// .....