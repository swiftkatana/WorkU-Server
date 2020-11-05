import express from 'express'
import { addEmployeeToWaitingList } from '../models/Companys';
import { updateCompanyUser } from '../models/User';
import { responedList } from '../respondList';
import router from './userRoute';


router.post("addTask", async (req, res, next) => {
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

router.post('/tasks')