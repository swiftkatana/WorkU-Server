const express = require("express");
const { Company } = require("../models/Companys");
const { Task } = require("../models/Task");
const { User, getUsers } = require("../models/User");
const { responedList } = require('../respondList');
const looger = require("../src/looger");
const router = require('./userRoute');


router.post("/addtasks", async (req, res) => {
    // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
    // and array of employees example [{email:example1@example.com,fullName:"example1 example1"},...]
    let { employees, task } = req.body;
    if (!employees || !typeof (task) === Object) {
        res.send(responedList.infoInvalid);
        return
    }
    looger('try to add task')
    let users = await User.find({ email: { $in: employees } }).catch(err => responedList.DBError).then(users => users);
    if (users.length !== employees.length || !users || users.err || !users[0].company) {
        looger(users ? users : responedList.usersNotFound)
        res.send(!users.err ? responedList.usersNotFound : users.err);
        return
    }
    let company = await Company.findOne({ name: users[0].company }).catch(err => responedList.DBError).then(company => company);
    if (!company || company.err) {
        looger(company)
        res.send(!company.err ? responedList.usersNotFound : company.err);
        return
    }
    let newTask = new Task({
        title: task.title, description: task.description, priority: task.priority
    });
    company.tasks.processing[newTask._id] = newTask;
    company.markModified('tasks');
    company.save(err => {
        if (err) {

            res.send(responedList.FaildSave)
            return
        }
    });
    users.forEach(user => {
        user.tasks.processing[newTask._id] = newTask;
        user.markModified('tasks')
        console.log(user)
        user.save(err => {
            if (err) {
                res.send(responedList.FaildSave)
                return
            }
        });
    });

    res.send(newTask);
});




module.exports = router