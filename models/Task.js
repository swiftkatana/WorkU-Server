const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String },
  sender: { type: {}, default: { firstName: "", email: "" } },
  status: { type: String, default: "uncompleted" },
  workers: {
    type: {},
    default: {},
  },
});

module.exports.TaskSchema = TaskSchema;

module.exports.Task = mongoose.model('Task', TaskSchema);