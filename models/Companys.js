const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  waitListEmployees: {
    type: [],
    default: [],
  },

  employees: {
    type: {},
    default: {},
  },
});
companySchema.method.waitingList = function () {
  return this.waitListEmployees.length;
};
exports.companySchema = companySchema;

exports.Company = new mongoose.model("company", companySchema);
