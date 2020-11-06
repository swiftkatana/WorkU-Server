const express = require('express');
const { addEmployeeToWaitingList, Company } = require('../models/Companys');
const { getUsers, updateUserCompany } = require('../models/User');
const { responedList } = require('../respondList');


const router = express.Router();


router.post('/asktojoin', async (req, res, next) => {
    const { companyName, user } = req.body
    let resUser = await updateUserCompany(user.email, { name: companyName, status: 'waiting' });
    if (resUser.err) {
        res.status(404).send(resUser.err);
        console.log(resUser.err);
        return;
    }

    let company = await addEmployeeToWaitingList(companyName, [{ email: resUser.email, firstName: resUser.firstName, lastName: resUser.lastName, imageProfile: resUser.imageProfile }])
    if (company.err) {
        res.status(404).send(company.err)
        console.log(company.err);
        return;
    }

    resUser.save(err => {
        if (err) {
            res.status(404).send(responedList.FaildSave)
            console.log(responedList.FaildSave);
            return;
        }
    });

    company.save(err => {
        if (err) {
            resUser.updateUserCompany(user.email, { name: '', status: '' })
            console.log(responedList.FaildSave);
            res.status(404).send(responedList.FaildSave)
            return
        } else res.send(responedList.good);


    });

    res.send(responedList.good);



});

router.post('/createcompany', async (req, res, next) => {
    let { companyName, user } = req.body;
    let managers = {}
    managers[user.adminPassword] = user
    let newCompany = new Company({
        name: companyName,
        employees: { managers }
    })



    const save = await getUsers({ email: user.email }).catch(err => {
        res.status(404).send(responedList.DBError)
        return false
    }).then(users => {
        users[0].company.name = companyName;
        users[0].company.status = 'accept';
        users[0].permission.manager = true;
        users[0].markModified('permission')
        users[0].markModified('company')
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
                        res.send(responedList.good)
                    }
                })
            }

        });

    })


});


router.post('acceptemployees', async (req, res, next) => {
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
