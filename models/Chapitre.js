const mongoose = require('mongoose');

const chapitreSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours',
    required: true
  }
});

const Chapitre = mongoose.model('Chapitre', chapitreSchema);

module.exports = Chapitre;
