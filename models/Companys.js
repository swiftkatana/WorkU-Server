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
        type: {},
        default: {},
    },
});
companySchema.method("AddToTheEmployeeList", function (arremployees) {

    arremployees.forEach(newEmployee => {
        if (this.employees[newEmployee.role]) {
            this.employees[newEmployee.role][newEmployee.email] = newEmployee
        } else {
            this.employees[newEmployee.role][newEmployee.email] = newEmployee
        }
    })

    return this
});


companySchema.method('AddToTheWaitingList', function (employees = []) {
    this.waitListEmployees = [...this.waitListEmployees, ...employees]
    return this
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
            return doc
        }
    })
}

exports.addEmployeeToWaitingList = async (companyName = "", newEmployee = []) => {
    return await Company.findOne({ name: companyName }).then(doc => {
        if (!doc) {
            console.log(companyName, doc)
            return responedList.NotExists;
        }

        return doc.AddToTheWaitingList(newEmployee);

    }).catch(err => {

        console.log(err)
        return error.code === 11000 ? responedList.isInUse : responedList.DBError
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
