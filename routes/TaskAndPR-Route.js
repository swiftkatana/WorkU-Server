const express = require("express");
const { responedList } = require('../respondList');
const looger = require("../src/looger");
const router = require('./userRoute');


router.post("/addTask", async (req, res) => {
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
                user.tasks[newTask._id] = newTask;
                user.save(err => {
                    if (err) {
                        res.send(responedList.FaildSave);
                    }
                })
            })
        } else {
            looger("didnt find users on the add new Task Route");
            res.send(responedList.usersNotFound);
            return;
        }

    }).catch(err => {
        looger(err);
        res.send(responedList.DBError);
        return;
    });


});

module.exports = router