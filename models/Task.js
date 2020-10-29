const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: "" },
  sender: { type: {}, default: { firstName: "", email: "" } },
  status: { type: "" },
  workers: {
    type: {},
    default: {},
  },
});
