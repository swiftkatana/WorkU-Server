const express = require("express");
const { Company } = require("../models/Companys");
const { Task } = require("../models/Task");
const { User, getuser } = require("../models/User");
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
    let user = await User.find({ email: { $in: employees } }).catch(err => responedList.DBError).then(user => user);
    if (user.length !== employees.length || !user || user.err || !user[0].company) {
        looger(user ? user : responedList.userNotFound)
        res.send(!user.err ? responedList.userNotFound : user.err);
        return
    }
    let company = await Company.findOne({ name: user[0].company }).catch(err => responedList.DBError).then(company => company);
    if (!company || company.err) {
        looger(company)
        res.send(!company.err ? responedList.userNotFound : company.err);
        return
    }
    let newTask = new Task({
        title: task.title, description: task.description || 'def', priority: task.priority, audios: [], employee: employees[0], fullName: user[0].fullName
    });
    company.tasks.processing[newTask._id] = newTask;
    company.tasks.processing[newTask._id].read = true
    company.markModified('tasks');
    company.save(err => {
        if (err) {

            res.send(responedList.FaildSave)
            return
        }
    });
    user.forEach(user => {
        user.tasks.processing[newTask._id] = newTask;
        user.tasks.processing[newTask._id].read = false;
        user.markModified('tasks')
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