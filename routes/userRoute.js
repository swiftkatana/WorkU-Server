const express = require("express");
path = require('path')

const { User } = require("../models/User");
const loger = require("../src/looger");
const { Company } = require("../models/Companys");
const { responedList } = require("../respondList");
const { PersonalRequest } = require("../models/personalRequest");
const looger = require("../src/looger");
const router = express.Router();




router.post("/joincompany", async (req, res) => {
  loger(' try join comepany')
  let { email, code } = req.body
  if (!email || !code) {
    loger('error1')
    res.send(responedList.InfoUnvalid)
    loger(responedList.InfoUnvalid);
    return;
  }
  let updateCompany;
  let updateUser;
  // get the company
  updateCompany = await Company.findOne({ joinCode: code }).catch(err => responedList.DBError).then(company => company || responedList.NotExists);
  if (updateCompany.err) {
    loger('error2')
    res.send(updateCompany.err);
    return;
  }
  //get the user
  updateUser = await User.findOne({ email }).catch(err => responedList.DBError).then(user => user || responedList.usersNotFound);
  if (updateUser.err) {
    loger('error3')
    res.send(updateUser.err);
    return
  }

  updateCompany.employees[updateUser.email] = { email: updateUser.email, fullName: updateUser.firstName + " " + updateUser.lastName, firstName: updateUser.firstName, lastName: updateUser.lastName, expoId: updateUser.expoId };
  updateCompany.markModified('employees')
  updateUser.company = updateCompany.name;

  console.log(updateUser)
  updateCompany.save(err => {
    if (err) {
      loger('error4')
      res.send(responedList.FaildSave);
      loger("someone try to register but got error : " + err);
      return;
    }
    updateUser.save(err => {
      if (err) {
        loger(err)
        loger('error5')
        res.send(responedList.FaildSave);
        loger("someone try to register but got error : " + err);
        return;
      }
    })
  })

  res.send(updateUser.filterUser());


})


router.post("/personalreuqest", async (req, res) => {
  // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
  // and array of employees example [{email:example1@example.com,fullName:"example1 example1"},...]
  let { type, body, fullName, email } = req.body

  if (!type || !body || !fullName || !email) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email }).then((user) => user).catch(err => responedList.DBError);
  if (!user || user.err) {
    looger("didnt find user on the add new Task Route");
    res.send(!user ? responedList.usersNotFound : responedList.DBError);
    return;
  }
  console.log(user)

  let company = await Company.findOne({ name: user.company }).then(doc => doc).catch(err => responedList.DBError);
  if (!company || company.err) {
    looger(company);
    res.send(!company ? responedList.usersNotFound : responedList.DBError);
    return;
  }


  const newPersonalRequest = new PersonalRequest({
    type, body, fullName, email
  });

  company.personalRequests[newPersonalRequest._id] = newPersonalRequest;
  company.markModified('personalRequests');
  company.save(err => {
    if (err) {
      res.send(responedList.FaildSave);
      user.personalRequestsDelete(personalRequests._id);
      return;
    }
  })

  user.personalRequests[newPersonalRequest._id] = newPersonalRequest;
  user.markModified('personalRequests');
  user.save(err => {
    if (err) {
      res.send(responedList.FaildSave);
      user.personalRequestsDelete(personalRequests._id);
      return;
    }
    res.send(newPersonalRequest);
  })


});

router.post('/updatetask', async (req, res) => {

  let { _id, comment, email, complete } = req.body;
  if (!_id || !email) {
    res.send(responedList.infoInvalid)
    return;
  }
  const user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.usersNotFound);
  if (user.err) {
    res.send(user.err);
    return;
  }
  const company = await Company.findOne({ name: user.company }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
  if (company.err) {
    res.send(company.err);
    return;
  }

  let updateTask = user.tasks.processing[_id];

  if (!updateTask) {
    res.send(responedList.NotExists);
    return
  }

  comment ? updateTask.comments.push(comment) : null;

  if (complete) {
    delete user.tasks.processing[updateTask._id]
    delete company.tasks.processing[updateTask._id]
    user.tasks.completed[updateTask._id] = updateTask;
    company.tasks.completed[updateTask._id] = updateTask;
    user.markModified('tasks');
    company.markModified('tasks');
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

  } else {
    user.tasks.processing[updateTask._id] = updateTask;
    company.tasks.processing[updateTask._id] = updateTask;
    user.markModified('tasks');
    company.markModified('tasks');
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


  }
  console.log('update task');
  res.send(updateTask);







});


router.post('/gettask', async (req, res) => {
  const { _id, email } = req.body;

  if (!_id || !email) {
    res.send(responedList.infoInvalid);
    return;
  }
  const user = await User.findOne(email).catch(err => responedList.DBError).then(doc => doc);
  if (!user || user.err) {
    res.send(!user ? responedList.usersNotFound : user.err);
    return;
  }
  let allTasks = { ...user.tasks.processing, ...user.tasks.completed }
  res.send(allTasks[_id] || responedList.NotExists);


});


router.post('/getpersonalreuqest', async (req, res) => {
  const { _id, email } = req.body;

  if (!_id || !email) {
    res.send(responedList.infoInvalid);
    return;
  }
  const user = await User.findOne(email).catch(err => responedList.DBError).then(doc => doc);
  if (!user || user.err) {
    res.send(!user ? responedList.usersNotFound : user.err);
    return;
  }

  res.send(user.personalRequests[_id] || responedList.NotExists);


});



router.post('/addnewworktime', async (req, res) => {
  const { createDateOfUser, email, timeWorkObj } = req.body;
  console.log('try to add a new time work ')
  if (!createDateOfUser || !email || !timeWorkObj) {
    res.send(responedList.infoInvalid);
    return;
  }
  let user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
  if (user.err) {
    res.send(user);
    return;
  }
  else if (user.createDateOfUser !== createDateOfUser) {
    console.log('not valid create user DAte', user.createDateOfUser, createDateOfUser)
    res.send(responedList.infoInvalid);
    return;
  }

  user.workTimes.unshift(timeWorkObj);

  user.markModified('workTimes');

  user.save(err => {
    if (err) {
      res.send(responedList.FaildSave);
      return
    }
    res.send('good');
  })


});
router.post('/restuserworktime', async (req, res) => {
  const { createDateOfUser, email } = req.body;
  console.log('try to add a new time work ')
  if (!createDateOfUser || !email) {
    res.send(responedList.infoInvalid);
    return;
  }
  let user = await User.findOne({ email }).catch(err => responedList.DBError).then(doc => doc || responedList.NotExists);
  if (user.err) {
    res.send(user);
    return;
  }
  else if (user.createDateOfUser !== createDateOfUser) {
    console.log('not valid create user DAte', user.createDateOfUser, createDateOfUser)
    res.send(responedList.infoInvalid);
    return;
  }

  user.workTimes = [];

  user.markModified('workTimes');

  user.save(err => {
    if (err) {
      res.send(responedList.FaildSave);
      return
    }
    res.send('good');
  })

});



module.exports = router;