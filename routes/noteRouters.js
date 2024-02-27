const express = require("express");
const { auth } = require("../middleware/authmiddleware");
const { createNote, getNotes, updateNote, deleteNote } = require("../controller/notesControllers");


noteRouter = express.Router();

noteRouter.post("/",auth, createNote);
noteRouter.get("/",auth,  getNotes);
noteRouter.patch("/:id",auth,  updateNote);
noteRouter.delete("/:id",auth,  deleteNote);

module.exports = { noteRouter };
// ..