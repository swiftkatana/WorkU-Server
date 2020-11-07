const e = require("express");
const mongoose = require("mongoose");
const { responedList } = require("../respondList");

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    completedTasks: {
        type: {},
        default: { completed: [], processing: [] }
    },
    personalreuqest: {
        type: {},
        default: {}
    },
    employees: {
        type: {},
        default: {},
    },
    joinCode: {
        type: String,
        default: '',
        required: true,
        index: true,
        unique: true,
    }
});
const Company = new mongoose.model("company", companySchema);


companySchema.method("AddToTheEmployeeList", function (arremployees) {
    arremployees.forEach(newEmployee => this.employees[newEmployee.email] = newEmployee)
    return this
});

companySchema.method('removeEmployees', function (arremployees) {
    arremployees.forEach(employee => {
        delete this.employees[employee.email]
    });

})


exports.companySchema = companySchema;
exports.Company = Company;