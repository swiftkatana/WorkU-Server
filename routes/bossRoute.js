const express = require("express");
const { default: errorList } = require("../respondList");
const { addEmployeeToEmployeeList } = require("../models/Companys");
const { Task } = require("../models/Task");
const { User } = require("../models/User");
const router = express.Router();

router.post("/addTask", async (req, res, next) => {
    // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
    // and array of employees example [{email:example1@example.com,fullName:"example1 example1"},...]

    let employees = req.body.employees;
    let sender = req.body.sender;
    let title = req.body.TaskTitle;

    const emails = employees.map((user) => user.email);

    findAsy(User, { email: { $in: emails } }).then((users) => {
        if (users.length === employees.length) {
            const newTask = new Task({

            });
            users.forEach(user => {

            })

        } else {
            next("didnt find users on the add new Task Route");
            res.status(404).send(errorList.usersNotFound);
            return;
        }

    }).catch(err => {
        next(err);
        res.status(404).send(errorList.DBError);
        return;
    });


});
router.post('/acceptemployees', async (req, res, next) => {
    // this api for accept employees - its can get arry of employees or one
    let employees = req.body.employees;
    let companyName = req.body.companyName;
    if (!companyName || !employees) {
        res.status(404).send(errorList.InfoUnvalid);
        next('unvalid info send so the server please fix its!')
        return;
    }
    addEmployeeToEmployeeList(companyName, employees).catch(err => {
        next(err);
        res.status(404).send(errorList.DBError);
        return;
    }).then(doc => {




    });




});




const findAsy = async (module, search) => {
    return await module
        .find(search)
        .catch((err) => {
            {
                return err;
            }
        })
        .then((doc) => {
            return doc.length <= 0 ? { err: "notFound" } : doc;
        });
};
