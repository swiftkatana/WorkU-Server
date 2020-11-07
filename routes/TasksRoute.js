const express = require("express");
const { addEmployeeToWaitingList } = require('../models/Companys');
const { updateCompanyUser } = require('../models/User');
const { responedList } = require('../respondList');
const router = require('./userRoute');


router.post("/addTask", async (req, res, next) => {
    // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
    // and array of employees example [{email:example1@example.com,fullName:"example1 example1"},...]

    let emails = req.body.employees;
    let task = req.body.task;



    getUsers({ email: { $in: emails } }).then((users) => {
        if (users.length === employees.length) {
            const newTask = new Task({
                title: task.tile,
                priority: task.priority,
                description: task.description
            });
            users.forEach(user => {
                user.tasks.push(newTask);
                user.save(err => {

                })
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

module.exports = router