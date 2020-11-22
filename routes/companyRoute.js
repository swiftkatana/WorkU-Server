const express = require('express');
const multer = require('multer');
const { AudioModel } = require('../models/audio');
const { Company } = require('../models/Companys');
const { User } = require('../models/User');
const { responedList } = require('../respondList');
const looger = require('../src/looger');


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/audio');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


router.post('/sendshiftsforemployee', async (req, res) => {
    console.log('send shift')
    const { shift, email } = req.body;

    if (!shift || !email) {
        console.log('error1', user)
        res.send(responedList.infoInvalid);
        return;
    }
    let user = await User.findOne({ email }).catch(err => responedList.DBError).then(docs => docs || responedList.userNotFound);
    if (user.err) {
        console.log('error2', user)

        res.send(user)
        return;
    }
    console.log(user)
    console.log(user.company)
    let company = await Company.findOne({ name: user.company }).catch(err => responedList.DBError).then(company => company || responedList.NotExists);
    if (company.err) {
        console.log('error3', company)
        res.send(company);
        return
    }
    if (company.shifts.length >= 2) {
        company.shifts.shift()
    }
    company.shifts.push(shift);

    company.markModified('shifts');
    company.save(err => {
        if (err) {
            res.send(responedList.FaildSave);
            return;
        }


    });
    return company.shifts

});


router.post('/uploadaudio', (req, res) => {
    console.log('upload audios');

    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage }).single('audio');

    upload(req, res, async function (err) {

        let { email, _id, fullName, to, readComOrUser } = req.body;
        if (!email || !_id) {
            res.send(responedList.infoInvalid);
            return;
        }
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send(responedList.infoInvalid);
        }
        else if (err instanceof multer.MulterError) {
            return res.send(responedList.infoInvalid);
        }
        else if (err) {
            return res.send(responedList.infoInvalid);
        }
        let audioPath = process.env.SERVER_IP + "/audio/" + req.file.filename;
        let audio = new AudioModel({ email, url: audioPath, fullName, taskId: _id });
        const user = await User.findOne({ email: to }).catch(err => responedList.DBError).then(doc => doc || responedList.usersNotFound);
        if (user.err) {
            console.log('error')
            res.send(user);
            return;
        }
        const company = await Company.findOne({ name: user.company }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
        if (company.err) {
            console.log('errpr')
            res.send(company);
            return;
        }

        let updateTask = { ...company.tasks.processing[_id] };


        if (!updateTask) {
            console.log('err ')
            res.send(responedList.NotExists);
            return;
        }
        let length = company.tasks.processing[updateTask._id].audios.length;
        if (readComOrUser === 'manager') {
            console.log('man')
            updateTask.read = true;
            updateTask.audios.push(audio)
            updateTask.audios[length].read = true;
            company.tasks.processing[updateTask._id] = { ...updateTask }
            company.markModified('tasks.processing')
            //--------------------------------------------------------------------
            updateTask.read = false;
            updateTask.audios[length].read = false;
            user.tasks.processing[updateTask._id] = { ...updateTask }

            user.markModified('tasks.processing')
        } else {
            console.log('emp')
            updateTask.read = true;
            updateTask.audios.push(audio)
            updateTask.audios[length].read = true;
            user.tasks.processing[updateTask._id] = { ...updateTask }
            user.markModified('tasks.processing')
            //-------------------------------------------------------------------
            updateTask.read = false;
            updateTask.read = false;
            company.tasks.processing[updateTask._id] = { ...updateTask }
            company.markModified('tasks.processing')
        }




        company.markModified('tasks');
        user.markModified('tasks');


        company.save(err => {
            if (err) {
                res.send(responedList.FaildSave);
                return;
            }
            user.save(err => {
                if (err) {
                    res.send(responedList.FaildSave);
                    return;
                }

            })
        })



        res.send(readComOrUser === 'manager' ? company.tasks.processing[updateTask._id].audios[company.tasks.processing[updateTask._id].audios.length - 1] : user.tasks.processing[updateTask._id].audios[company.tasks.processing[updateTask._id].audios.length - 1]);
    });
});

router.post('/readTaskUpdate', async (req, res) => {
    const { audio, email, read } = req.body;

    if (!email) {
        res.send(responedList.infoInvalid);
        return;
    }

    const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (user.err) {
        console.log('errpr')
        res.send(user);
        return;
    }

    const company = await Company.findOne({ name: user.company }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (company.err) {
        console.log('errpr')
        res.send(company);
        return;
    }
    if (read.task) {
        user.tasks.processing[UupdateTask._id].read = true;
        company.tasks.processing[UupdateTask._id].read = true;

    }
    if (audio) {
        if (read.audio.comapny) {
            company.tasks.processing[UupdateTask._id].audios.forEach(au => {
                if (au.url === audio.url) {
                    au.read = true;
                }
            })

        } else {
            user.tasks.processing[UupdateTask._id].audios.forEach(au => {
                if (au.url === audio.url) {
                    au.read = true;
                }
            })

        }

    }



});

router.post('/createcompany', async (req, res) => {
    const { companyName, email } = req.body;
    let joinCode = Math.floor(Math.random() * (999999 - 100000) + 100000) + companyName[0] + "#" + companyName;
    let newCompany = new Company({
        name: companyName,
        employees: {},
        joinCode: joinCode,
        tasks: { completed: {}, processing: {} },
        personalRequests: {}
    });

    let user = await User.findOne({ email: email }).catch(err => responedList.DBError).then(doc => doc || responedList.usersNotFound);
    if (user.err) {
        res.send(user);
        return;
    }
    newCompany.manager = { joinCode, email, imageProfile: user.imageProfile, phone: user.phone, email: user.email, fullName: user.firstName + " " + user.lastName, firstName: user.firstName, lastName: user.lastName, expoId: user.expoId }
    newCompany.markModified('manager');
    user.company = companyName;
    user.permission.manager = true;
    user.joinCode = joinCode
    user.markModified('permission')
    user.markModified('company')
    user.markModified('joinCode')
    user.role = 'manager';
    newCompany.save(err => {
        if (err) {
            looger(err.message)
            res.send(err.code === 11000 ? responedList.isInUse : responedList.FaildSave)
            return
        } else {
            user.save(err => {
                if (err) {
                    newCompany.remove();
                    looger(err.message)
                    res.send(responedList.FaildSave)
                } else {
                    looger('someone  create a company')
                    res.send({ ...newCompany._doc })
                }
            });
        }

    });

});

router.post('/getworktimes', async (req, res) => {
    let { email } = req.body;
    console.log('try to get works time')
    if (!email) {
        console.log('error1')
        res.send(responedList.infoInvalid);
        return;
    }
    const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (user.err) {
        console.log('error2')

        res.send(responedList.infoInvalid)
        return
    }

    res.send(user.workTimes);


})
router.post('/getshiftsworkscom', async (req, res) => {
    let { email } = req.body;
    console.log('try to get works time')
    if (!email) {
        console.log('error1')
        res.send(responedList.infoInvalid);
        return;
    }
    const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (user.err) {
        console.log('error2')

        res.send(responedList.infoInvalid)
        return
    }

    const company = await Company.findOne({ name: user.company }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (company.err) {
        console.log('errpr')
        res.send(company);
        return;
    }

    res.send(company.shifts);


})



router.post('/getcompany', async (req, res) => {
    const { joinCode, email, comapnyName } = req.body;

    if (!email) {
        res.send(responedList.infoInvalid);
        return;
    }
    let filter = joinCode ? { joinCode } : { name: comapnyName }
    const comapny = await Company.findOne(filter).exec().catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (comapny.err) {
        res.send(comapny.err);
        return;
    }
    if (comapny.manager.email !== email && !comapny.employees[email]) {
        res.send(responedList.NotExists)
        return
    }
    console.log('get company')
    res.send({ ...comapny._doc });
});



router.post('/getexpoid', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.send("");
        return
    }

    const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
    if (user.err) {
        res.send("")
        return
    }
    console.log('someone ask this expo id', user.expoId)
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
