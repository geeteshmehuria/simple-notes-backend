const { NoteModule } = require("../model/noteModule");

const createNote = async (req, res) => {
  try {
   const note = new NoteModule(req.body);
    await note.save();
    res.send({ msg: "note added successfully " });
  } catch (error) {
    console.log(`Error in creating a note: ${error}`);
    res.send({ error: "Error in adding the note" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await NoteModule.find({ userId: req.body.userId });
    res.send({ notes });
  } catch (error) {
    console.log(`Error in getting all Notes : ${error}`);
    res.status(401).send({ error: "Error in fetching data!" });
  }
};

const updateNote = async (req, res) => {
  // const { title, singerName, albumName, releaseYear } = req.body;
  const { id } = req.params;
  // console.log(id);
  try {
    await NoteModule.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(200).send({ msg: "Note update successfully " });
  } catch (error) {
    return res.status(500).send({ msg: "Error updating Note", error: error });
    console.log(error);
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    await NoteModule.findByIdAndDelete({ _id: id });
    return res.status(200).send({ msg: "note Delete successfully " });
  } catch (error) {
    return res.status(500).send({ msg: "Error Delete note", error: error });
    console.log(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
