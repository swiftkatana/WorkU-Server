const express = require('express');
const multer = require('multer');
const { Company } = require('../models/Companys');
const { getUsers, User } = require('../models/User');
const { responedList } = require('../respondList');
const looger = require('../src/looger');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/pdfs');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



router.post('/upload-paycheck-pic', (req, res) => {

    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single('pdf');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log(req.body.pdf)
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        let pdfPath = process.env.SERVER_IP + "/pdfs/" + req.file.filename;
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${pdfPath}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});

router.post('/createcompany', async (req, res) => {
    let { companyName, email } = req.body;
    let joinCode = Math.floor(Math.random() * (999999 - 100000) + 100000) + companyName[0] + "#" + companyName;
    let newCompany = new Company({
        name: companyName,
        employees: {},
        joinCode: joinCode,
        tasks: { completed: {}, processing: {} },
        personalRequests: {}
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
        users[0].company = companyName;
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
    console.log('get company')
    const { joinCode, email } = req.body;

    if (!joinCode || !email) {
        res.send(responedList.infoInvalid);
        return;
    }
    const comapny = await Company.findOne({ joinCode }).exec().catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (comapny.err) {
        res.send(comapny.err);
        return;
    }
    if (comapny.manager.email !== email) {
        res.send(responedList.NotExists)
        return
    }

    res.send({ ...comapny._doc });
});



router.post('/getexpoid', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.send(responedList.infoInvalid);
        return
    }

    const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (user.err) {
        res.send(user)
        return
    }
    res.send(user.expoId)

})




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

    const { _id, status, email } = req.body;
    if (!_id || !status || !email) {
        res.send(responedList.infoInvalid);
        return;
    }
    let user = await User.findOne({ email }).catch(err => responedList.FaildSave).then(doc => doc || responedList.usersNotFound);
    if (user.err) {
        looger(user);
        res.send(user);
        return;
    }

    let company = await Company.findOne({ name: user.company }).then(doc => doc || responedList.NotExists).catch(err => responedList.DBError);
    if (company.err) {
        looger(company);
        res.send(company);
        return;
    }
    user.personalRequests[_id].status = status;



    company.personalRequests[_id].status = status;



    company.markModified('personalRequests');
    user.markModified('personalRequests');

    company.save(err => {
        if (err) {
            res.send(responedList.FaildSave);
            return;
        } else {
            user.save(err => {
                if (err) {
                    res.send(responedList.FaildSave);
                    return;
                }
                res.send(user.personalRequests[_id]);
            })
        }
    })



});




module.exports = router  
