const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  state: Boolean,
  urgence: Boolean,
  domaine: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  imageURLs: [
    {
      type: String,
      //  required: true
    }
  ],
  deadline: String
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
