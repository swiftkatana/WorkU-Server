const mongoose = require("mongoose");
const { responedList } = require("../respondList");
const { TaskSchema } = require("./Task");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "",
  }, class: {
    type: String,
    default: ''
  },
  createDateOfUser: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
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
  }, expoId: {
    type: String,
    default: ''
  }

});
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.method('updateCompany', function (newStatus) {
  this.company = { ...this.company, ...newStatus };
});


exports.userSchema = userSchema;
const User = mongoose.model("Users", userSchema);
exports.User = User;


exports.updateCompanyUser = async (email = "", newStatus = {}) => {
  return await User.findOne({ email }).then(user => {
    if (!user) return responedList.NotExists;
    user.updateCompany(newStatus);
    return user
  }).catch(Err => responedList.DBError);
}