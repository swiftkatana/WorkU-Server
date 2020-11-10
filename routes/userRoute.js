const express = require("express");
const bcrypt = require("bcrypt");
const legit = require('legit');

const { User } = require("../models/User");
const loger = require("../src/looger");
const { Company, addEmployeeToWaitingList, updateExpoId } = require("../models/Companys");
const { responedList } = require("../respondList");
const { PersonalRequest } = require("../models/personalRequest");
const looger = require("../src/looger");
const saltPassword = 10;
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password, expoId } = req.body;
  if (!email || !password) {

    res.send(responedList.InfoUnvalid)
    loger('miss info been send to the login api', responedList.InfoUnvalid);
    return;
  }
  User.findOne({ email: email })
    .catch(err => {
      loger(err);

      res.send(responedList.DBError);
      return;
    })
    .then(user => {
      if (!user) {

        res.send(responedList.usersNotFound);
        loger('cant find user on login ' + email);
        return;
      }
      bcrypt.compare(password, user.password, async (err, login) => {
        if (err) {
          loger("password not right\n" + err);

          res.send(responedList.InfoUnvalid);
          return;
        } else {
          if (login) {
            if (user.expoId !== expoId) {
              console.log('new expo id')
              if (user.Company) {
                let err = await updateExpoId({ expoId, name: user.Company, email: user.email });
                if (err.err) {
                  res.send(err);
                  return
                }

              }
              user.expoId = expoId;
              user.markModified('expoId')
              user.save(err => {
                if (err) {
                  res.send(responedList.FaildSave);
                  return;
                }
              })

            }
            loger("someone login to our web sucssesfull email: " + email);
            res.send(user.filterUser());
            return;
          } else {
            loger(req.ip + " just try login but not! password not good  :  " + email);

            res.send(responedList.InfoUnvalid);
            return;
          }
        }
      });


    })
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    loger('miss info been send to the register api');

    res.send(responedList.InfoUnvalid);
    return;
  }
  // check email is legit 
  const legitEmail = await legit(email)
  if (!legitEmail.isValid) {
    loger('email not valid');

    res.send(responedList.emailNotExistsL);
    return;
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {
    if (err) {
      loger("err on register" + err);

      res.send(responedList.FaildSave);
      return;
    }
    const user = new User({
      email,
      password: hash,
      firstName,
      lastName,
    });
    {
      user.save((err) => {
        if (err) {

          res.send(err.code === 11000 ? responedList.UserIsAlreadyCreated : responedList.FaildSave);
          loger("someone try to register but got error : " + err);
          return;
        } else {
          loger("someone register to our web now this email : " + email);
          res.send(user.filterUser());
        }
      });
    }
  });
});

router.post("/joincompany", async (req, res) => {
  loger('join comepany')
  let { email, code } = req.body
  if (!email || !code) {
    loger('error1')
    res.send(responedList.InfoUnvalid)
    loger(responedList.InfoUnvalid);
    return
  }
  let updateCompany, updateUser;
  // get the company
  updateCompany = await Company.findOne({ joinCode: code }).catch(err => responedList.DBError).then(company => company);
  if (!updateCompany || updateCompany.err) {
    loger('error2')
    res.send(!updateCompany ? responedList.NotExists : updateCompany);
    return;
  }
  //get the user
  updateUser = await User.findOne({ email }).catch(err => responedList.DBError).then(user => user);
  if (updateUser.err || !updateUser) {
    loger('error3')
    res.send(!updateUser ? responedList.usersNotFound : updateCompany);
  }

  updateCompany.employees[updateUser.email] = { email: updateUser.email, firstName: updateUser.firstName, lastName: updateUser.lastName, expoId: updateUser.expoId };
  updateCompany.markModified('employees')
  updateUser.company = updateCompany.name;


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
    return
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

  let { text, _id } = req.body;
  if (!_id) {
    res.send(responedList.infoInvalid)
    return;
  }


});


module.exports = router;