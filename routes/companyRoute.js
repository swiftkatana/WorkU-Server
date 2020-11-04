import express from 'express'
import { addEmployeeToWaitingList } from '../models/Companys';
import { updateCompanyUser } from '../models/User';
import { responedList } from '../respondList';


const router = express.Router();


router.post('/api/company/asktojoin', async (req, res, next) => {
    const { companyName, user } = req.body
    let user = await updateCompanyUser(user.email, { name: companyName, status: 'waiting' });
    if (user.err) {
        res.status(404).send(user.err);
        console.log(user.err);
        return;
    }

    let company = await addEmployeeToWaitingList(companyName, [{ email: user.email, firstName: user.firstName, lastName: user.lastName, imageProfile: user.imageProfile }])
    if (company.err) {
        res.status(404).send(company.err)
        console.log(company.err);
        return;
    }

    user.save(err => {
        res.status(404).send(responedList.FaildSave)
        console.log(responedList.FaildSave);

        return;
    });

    company.save(err => {
        console.log(responedList.FaildSave);

        setTimeout(() => {

            company.save(err => {
                res.status(404).send(responedList.FaildSave)
                console.log(responedList.FaildSave);
            })

        }, 10000);

    });

    res.send(responedList.good);



});

router.post('/api/company/createcompany', async (req, res, next) => {
    let { companyName, user } = req.body;



});


router.post('/acceptemployees', async (req, res, next) => {
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
