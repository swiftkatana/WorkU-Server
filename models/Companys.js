const mongoose = require("mongoose");
const { responedList } = require("../respondList");
const { User } = require("./User");

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
        type: [],
        default: [],
    },
});
companySchema.method("AddToTheEmployeeList", function (newEmployee) {
    this.employees = [...this.employees, ...newEmployee];
    this.save();

});
companySchema.method('AddToTheWaitingList', function (employee) {
    this.waitListEmployees.push(employee);
    this.save();
})
exports.companySchema = companySchema;
const Company = new mongoose.model("company", companySchema);

exports.Company = Company;

exports.addEmployeeToEmployeeList = async (companyName = "", newEmployee = []) => {

    Company.findOne({ name: companyName }, (err, doc) => {
        if (err || !doc) {
            return errorList.DBError
        } else {
            doc.AddToTheEmployeeList(newEmployee);
            return errorList.good
        }
    })
}

exports.addEmployeeToWaitingList = async (companyName = "", newEmployee = []) => {
    let Doc = await Company.findOne({ name: companyName }, (err, doc) => {
        if (err || !doc) {
            returnerrorList.DBError
        }
        Doc.AddToTheWaitingList(newEmployee);
        return errorList.good
    })
}

// function findChildren(doc) {
//     if (doc.children.length < 0) {
//         console.log(doc.innerText)
//         return;
//     } else {
//         for (const chi of doc) {
//             if (chi.children.length > 0) {
//                 findChildren(chi)
//             } else {
//                 console.log(chi)
//             }
//         }
//     }


// // }
// for (var doc of document.body.children) {

//     if (doc.children.length > 0) {
//         for (var chi of doc.children) {
//             if (chi.children.length > 0) {
//                 for (var gchi of chi.children) {
//                     if (gchi.children.length > 0) {
//                         for (var GGgchi of gchi.children) {
//                             console.log('GGgchi', GGgchi.innerText)
//                         }
//                     } else {
//                         console.log('GGgchi', GGgchi.innerText)
//                     }

//                 }
//             } else {
//                 console.log('chi', chi.innerText)
//             }
//         }
//     }
//     else {
//         console.log('main', doc.innerText)
//     }
// }
