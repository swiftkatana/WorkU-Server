const mongoose = require("mongoose");
const { TaskSchema } = require("./Task");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "default",
  },
  createDateOfUser: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  phone: String,
  address: String,
  imageProfile: {
    type: String,
    default: process.env.SERVER_IP + "images/defaultProfile.png",
  },
  company: {
    type: {},
    default: { name: "none", status: "" },
  },
  tasks: {
    type: [],
    default: [],
  },
  permission: {
    type: {},
    default: {},
  }, NotificationsId: {
    type: String,
    default: ''
  }

});
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
exports.userSchema = userSchema;
const User = mongoose.model("Users", userSchema);

exports.User = User;
