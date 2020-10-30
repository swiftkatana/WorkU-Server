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
    completedTasks: {
        type: [],
        default: []
    },

    employees: {
        type: {},
        default: {},
    },
});
companySchema.method("waitingList", function () {

    return this.waitListEmployees.length;
})
companySchema.method('AddToTheWaitingList', function (employee) {
    this.waitListEmployees.push(employee);
})
exports.companySchema = companySchema;
exports.Company = Company = new mongoose.model("company", companySchema);



exports.addEmployeeToWaitingList = async (companyName, newEmployee) => {
    let Doc = await Company.findOne({ name: companyName })
    Doc.AddToTheWaitingList(newEmployee);
    return Doc
}