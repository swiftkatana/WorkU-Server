const express = require('express');
const { Company } = require('../models/Companys');
const { getUsers, User } = require('../models/User');
const { responedList } = require('../respondList');


const router = express.Router();


router.post('/createcompany', async (req, res, next) => {
    let { companyName, email } = req.body;
    let joinCode = Math.random().toString().replace(".", "") + companyName;
    let managers = {}
    managers[joinCode] = email
    console.log(joinCode)
    let newCompany = new Company({
        name: companyName,
        employees: { managers },
        joinCode: joinCode
    })


    getUsers({ email: email }).catch(err => {
        res.status(404).send(responedList.DBError)
        return false
    }).then(users => {
        if (!user) {

        }
        if (users[0].company.name !== '') {
            res.status(404).send(responedList.DBError);
            return
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
                console.log(err.message)
                res.status(404).send(err.code === 11000 ? responedList.isInUse : responedList.FaildSave)
                return ""
            } else {
                users[0].save(err => {
                    if (err) {

                        newCompany.remove();
                        console.log(err.message)
                        res.status(404).send(responedList.FaildSave)
                    } else {
                        console.log('someone  create a company')
                        res.send(joinCode)
                    }
                })
            }

        });

    })


});




router.delete("/leave", async (req, res, next) => {
    //need to get in the req body a 2 things email and is password
    const { email, manager } = req.body;
    let saveCompany, saveManager, saveEmployee
    User.findOne({ unqiePassword: manager.unqiePassword }).then(async docManager => {
        if (!docManager) {
            console.log('cant find the manager')
            res.status(404).send(responedList.InfoUnvalid);
            return
        }
        saveCompany = await Company.findOne({ name: docManager.company.name })
            .then(docCompany => {
                if (!docCompany) {
                    console.log('cant find the company')
                    res.status(404).send(responedList.InfoUnvalid);
                    return false
                }
                company.removeEmployees([{ email }]);
                company.save(err => {
                    if (err) {
                        console.log('cant update company that i want to remove a employee');
                        res.status(404).send(responedList.FaildSave);
                        return false
                    }
                });
                return true

            }).catch(err => {
                console.log('cant update company that i want to remove a employee');
                res.status(404).send(responedList.DBError);
                return false
            });

        if (saveCompany) {
            saveEmployee = await User.findOneAndUpdate({ email }, { company: { name: '', status: '' } }, { new: true })
        }

        if (saveEmployee.ok === 1) {
            res.send(responedList.good)
        }

    }).catch(err => {
        console.log('cant update  that i want to remove a employee');
        res.status(404).send(responedList.DBError);
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
