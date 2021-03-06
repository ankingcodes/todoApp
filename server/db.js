const mongoose = require('mongoose');
const todo = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  task: {type: String, required: true},
  hasCompleted: {type: Boolean, default: false}
})

module.exports = mongoose.model('todo', todo);