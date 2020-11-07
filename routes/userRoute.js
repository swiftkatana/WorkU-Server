const express = require("express");
const bcrypt = require("bcrypt");
const legit = require('legit');

const { User } = require("../models/User");
const loger = require("../src/looger");
const { Company, addEmployeeToWaitingList } = require("../models/Companys");
const { responedList } = require("../respondList");
const saltPassword = 10;
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('error')
    res.send(responedList.InfoUnvalid)
    loger('miss info been send to the login api', responedList.InfoUnvalid);
    return;
  }
  User.findOne({ email: email })
    .catch(err => {
      loger(err);
      console.log('error')
      res.send(responedList.DBError);
      return;
    })
    .then(user => {
      if (!user) {
        console.log('error')
        res.send(responedList.usersNotFound);
        loger('cant find user on login ' + email);
        return;
      }
      bcrypt.compare(password, user.password, (err, login) => {
        if (err) {
          loger("password not right\n" + err);
          console.log('error')
          res.send(responedList.InfoUnvalid);
          return;
        } else {
          if (login) {
            loger("someone login to our web sucssesfull email: " + email);
            console.log('error')
            res.send(user.filterUser());
            return;
          } else {
            loger(req.ip + " just try login but not! password not good  :  " + email);
            console.log('error')
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
    console.log('error')
    res.send(responedList.InfoUnvalid);
    return;
  }
  // check email is legit 
  const legitEmail = await legit(email)
  if (!legitEmail.isValid) {
    loger('email not valid');
    console.log('error')
    res.send(responedList.emailNotExistsL);
    return;
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {
    if (err) {
      loger("err on register" + err);
      console.log('error')
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
          console.log('error')
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
  console.log('join comepany')
  let { email, code } = req.body
  if (!email || !code) {
    console.log('error1')
    res.send(responedList.InfoUnvalid)
    loger(responedList.InfoUnvalid);
    return
  }
  let updateCompany, updateUser;
  // get the company
  updateCompany = await Company.findOne({ joinCode: code }).catch(err => responedList.DBError).then(company => company);
  if (!updateCompany || updateCompany.err) {
    console.log('error2')
    res.send(!updateCompany ? responedList.NotExists : updateCompany);
    return;
  }
  //get the user
  updateUser = await User.findOne({ email }).catch(err => responedList.DBError).then(user => user);
  if (updateUser.err || !updateUser) {
    console.log('error3')
    res.send(!updateUser ? responedList.usersNotFound : updateCompany);
  }

  updateCompany.employees[updateUser.email] = updateUser.email;

  updateUser.company = { name: updateCompany.name, status: 'accept' };


  updateCompany.save(err => {
    if (err) {
      console.log('error4')
      res.send(responedList.FaildSave);
      loger("someone try to register but got error : " + err);
      return;
    }
    updateUser.save(err => {
      if (err) {
        console.log(err)
        console.log('error5')
        res.send(responedList.FaildSave);
        loger("someone try to register but got error : " + err);
        return;
      }
    })
  })

  res.send(updateUser.filterUser());


})

module.exports = router;