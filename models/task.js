const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 9,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled', 'deleted'],
    default: 'pending',
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
