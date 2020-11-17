const e = require("express");
const mongoose = require("mongoose");
const { responedList } = require("../respondList");
const personalRequestSchema = require('../models/personalRequest')

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
        type: { personalRequestSchema },
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


companySchema.method('completedTask', function (task) {
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


exports.updateExpoId = async (expoId, name, email) => {

    const doc = await Company.findOne({ name }).catch(err => responedList.DBError);
    if (!doc || doc.err) {
        return !doc ? responedList.NotExists : doc;
    }
    doc.employees[email].expoId = expoId;
    doc.save(err => {
        if (err) {
            return responedList.FaildSave;
        }
        return doc
    })

}