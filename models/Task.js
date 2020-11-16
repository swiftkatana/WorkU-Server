const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  priority: { type: String, default: '' },
  comments: { type: [], default: [] },
  status: { type: String, default: "not_complete" },
  date: { type: Date, default: Date.now().toLocaleString() }
});

module.exports.TaskSchema = TaskSchema;



module.exports.Task = mongoose.model('Task', TaskSchema);