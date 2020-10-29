const { Schema, Model } = require("mongoose");

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
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
company.method.waitingList = function () {
  return this.waitListEmployees.length;
};
module.exports.companySchema = companySchema;

module.exports.Company = new Model("company", companySchema);
