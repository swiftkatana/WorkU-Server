const mongoose = require("mongoose");
const { responedList } = require("../respondList");
const { TaskSchema } = require("./Task");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "",
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
    default: { name: "", status: "" },
  },
  tasks: {
    type: {},
    default: { completed: {}, processing: {} }
  },
  personalRequests: { type: {}, default: {} },
  permission: {
    type: {},
    default: {},
  }, expoId: {
    type: String,
    default: ''
  },
  joinCode: {
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



userSchema.method('create&UpdateTask', function (task) {
  this.Tasks.processing[task._id] = task;
});


userSchema.method('completed', function (task) {
  delete this.Tasks.processing[task._id];
  this.Tasks.completed[task._id] = task;
});

userSchema.method('create&UpdatePersonalRequest', function (personalRequest) {
  this.personalRequests[personalRequest._id] = personalRequest;
});

userSchema.method('filterUser', function () {
  let filterUser = { ...this._doc }
  filterUser._id = 'Base64 = aGFoYSB5b3UgdGhpbmsgdGhhdCB0aGUgcmVhbCBpZCBoYWhhaGFoYQ=='
  filterUser.password = 'aGFoYWhhIHlvdSB0aGluayB0aGF0IGlzIHRoZSBwYXNzd29yZCBoYWhhaGFoYWhh '
  return filterUser
});

exports.userSchema = userSchema;
const User = mongoose.model("Users", userSchema);
exports.User = User;


exports.updateUserCompany = async (email = "", newStatus = {}) => {
  return await User.findOne({ email }).then(user => {
    if (!user) return responedList.NotExists;
    user.updateCompany(newStatus);
    return user
  }).catch(Err => responedList.DBError);
}

exports.getUsers = async (filter) => User.find(filter).catch(err => responedList.DBError).then(users => !users ? responedList.NotExists : users)

