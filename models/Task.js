const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  status: { type: String, default: "uncompleted" },
});

module.exports.TaskSchema = TaskSchema;

module.exports.Task = mongoose.model('Task', TaskSchema);