const express = require('express');
const { Company } = require('../models/Companys');
const { getUsers, User } = require('../models/User');
const { responedList } = require('../respondList');
const looger = require('../src/looger');


const router = express.Router();


router.post('/createcompany', async (req, res, next) => {
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

module.exports = router


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
