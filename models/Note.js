const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  chapitre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapitre",
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
