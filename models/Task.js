const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: "" },
  status: { type: "" },
  workers: {
    type: {},
    default: {},
  },
});
