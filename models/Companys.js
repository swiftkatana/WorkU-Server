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
    tasks: {
        type: {},
        default: { completed: {}, processing: {} }
    },
    personalRequests: {
        type: {},
        default: {}
    }, manager: {
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

companySchema.method('createUpdateTask', function (task) {
    this.tasks.processing[task._id] = task;
});


companySchema.method('completed', function (task) {
    delete this.Tasks.processing[task._id];
    this.Tasks.completed[task._id] = task;
});

companySchema.method('create&UpdatePersonalRequest', function (personalRequest) {
    this.personalRequests[personalRequest._id] = personalRequest;
});


companySchema.method('removeEmployees', function (arremployees) {
    arremployees.forEach(employee => {
        delete this.employees[employee.email]
    });

})


exports.companySchema = companySchema;
exports.Company = Company;