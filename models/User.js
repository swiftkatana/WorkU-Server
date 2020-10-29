const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: {},
    default: { role: "worker", status: "waiting" },
  },
  createDateOfUser: { type: Date, default: Date.now },
  firstName: { type: String },
  lastName: { type: String },
  phone: String,
  address: String,
  imageProfile: {
    type: String,
    default: process.env.SERVER_IP + "public/images/defaultProfile.png",
  },
  company: {
    type: {},
    default: { name: "none", status: "" },
  },
  tasks: {
    type: {},
    default: {},
  },
  connections: { type: {}, default: {} },
});
exports.userSchema = userSchema;
const User = mongoose.model("Users", userSchema);

exports.User = User;
