const express = require("express");
const { default: errorList } = require("../errorList");
const { Task } = require("../models/Task");
const { User } = require("../models/User");
const router = express.Router();

router.post("/addTask", async (req, res, next) => {
    // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
    // and array of workers example [{email:example1@example.com,fullName:"example1 example1"},...]

    let workers = req.body.workers;
    let sender = req.body.sender;
    let title = req.body.TaskTitle;

    const emails = workers.map((user) => user.email);

    findAsy(User, { email: { $in: emails } }).then((users) => {
        if (users.length === workers.length) {
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
router.post('/acceptem', (req, res) => {
    // this api help 


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
