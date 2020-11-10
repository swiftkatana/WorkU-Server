const express = require('express');
const { Company } = require('../models/Companys');
const { getUsers, User } = require('../models/User');
const { responedList } = require('../respondList');
const looger = require('../src/looger');


const router = express.Router();


router.post('/createcompany', async (req, res) => {
    let { companyName, email } = req.body;
    let joinCode = Math.floor(Math.random() * (999999 - 100000) + 100000) + companyName[0] + "#" + companyName;
    let newCompany = new Company({
        name: companyName,
        employees: {},
        joinCode: joinCode
    });
    newCompany.manager = { joinCode, email }
    newCompany.markModified('manager');
    getUsers({ email: email }).catch(err => {
        res.send(responedList.DBError)
        return false
    }).then(users => {
        if (!users[0]) {
            res.send(responedList.usersNotFound);
            return;
        }
        users[0].company.name = companyName;
        users[0].company.status = 'accept';
        users[0].permission.manager = true;
        users[0].joinCode = joinCode
        users[0].markModified('permission')
        users[0].markModified('company')
        users[0].markModified('joinCode')
        users[0].role = 'manager';
        newCompany.save(err => {
            if (err) {
                looger(err.message)
                res.send(err.code === 11000 ? responedList.isInUse : responedList.FaildSave)
                return
            } else {
                users[0].save(err => {
                    if (err) {
                        newCompany.remove();
                        looger(err.message)
                        res.send(responedList.FaildSave)
                    } else {
                        looger('someone  create a company')
                        res.send(joinCode)
                    }
                });
            }

        });

    })


});


router.post('/getcompany', async (req, res) => {

    const { joinCode, email } = req.body;

    if (!joinCode || !email) {
        res.send(responedList.infoInvalid);
        return;
    }
    const comapny = await Company.findOne({ joinCode }).catch(err => responedList.DBError).then(comapny => comapny);
    if (comapny.err || !comapny || comapny.manager.email !== email) {
        res.send(comapny.err ? comapny.err : responedList.NotExists);
        return;
    }
    res.send(comapny);
});




router.delete("/leave", async (req, res, next) => {
    //need to get in the req body a 2 things email and is password
    const { email, manager } = req.body;
    let saveCompany, saveManager, saveEmployee
    User.findOne({ unqiePassword: manager.unqiePassword }).then(async docManager => {
        if (!docManager) {
            looger('cant find the manager')
            res.send(responedList.InfoUnvalid);
            return
        }
        saveCompany = await Company.findOne({ name: docManager.company.name })
            .then(docCompany => {
                if (!docCompany) {
                    looger('cant find the company')
                    res.send(responedList.InfoUnvalid);
                    return false
                }
                company.removeEmployees([{ email }]);
                company.save(err => {
                    if (err) {
                        looger('cant update company that i want to remove a employee');
                        res.send(responedList.FaildSave);
                        return false
                    }
                });
                return true

            }).catch(err => {
                looger('cant update company that i want to remove a employee');
                res.send(responedList.DBError);
                return false
            });

        if (saveCompany) {
            saveEmployee = await User.findOneAndUpdate({ email }, { company: { name: '', status: '' } }, { new: true })
        }

        if (saveEmployee.ok === 1) {
            res.send(responedList.good)
        }

    }).catch(err => {
        looger('cant update  that i want to remove a employee');
        res.send(responedList.DBError);
    })



});


router.post('/updatepersonalreuqest', async (req, res) => {
    const { _id, status, respond, email } = req.body;
    if (!_id || !status || !respond || !email) {
        res.send(responedList.infoInvalid);
        return;
    }
    let user = await User.findOne({ email }).catch(err => responedList.FaildSave).then(doc => doc);
    if (user.err || !user) {
        looger(user);
        res.send(user.err ? user.err : responedList.usersNotFound);
        return;
    }

    let company = await Company.findOne({ name: user.company }).then(doc => doc).catch(err => responedList.DBError);
    if (!company || company.err) {
        looger(company);
        res.send(!company ? responedList.usersNotFound : company.err);
        return;
    }

    let newPersonalRequests = { ...user.personalRequests[_id], respond, status, };



    company.personalRequests[_id] = newPersonalRequests;
    user.personalRequests[_id] = newPersonalRequests;


    company.markModified('personalRequests');
    user.markModified('personalRequests');

    company.save(err => {
        if (err) {
            res.send(responedList.FaildSave);
            user.personalRequestsDelete(newPersonalRequests._id);
            return;
        } else {
            user.save(err => {
                if (err) {
                    res.send(responedList.FaildSave);
                    user.personalRequestsDelete(newPersonalRequests._id);
                    return;
                }
                res.send(newPersonalRequests);
            })
        }
    })



});

module.exports = router  
