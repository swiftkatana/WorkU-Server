const mongoose = require("mongoose");
const { audioSchema } = require("./audio");
var getFullDate = function (sp) {
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (mm + sp + dd + sp + yyyy);
};
const TaskSchema = new mongoose.Schema({
  title: { type: String, default: '', required: true },
  description: { type: String, default: '', required: true },
  priority: { type: String, default: '' },
  audios: { type: [audioSchema], default: [] },
  date: { type: Date, default: getFullDate('/') },
  employee: { type: String, default: '' },
  read: { type: Boolean, default: false },
  status: { type: String, default: '' },
  fullName: { type: String, default: '' }
});

module.exports.TaskSchema = TaskSchema;



module.exports.Task = mongoose.model('Task', TaskSchema);