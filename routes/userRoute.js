const express = require("express");
const bcrypt = require("bcrypt");
const legit = require('legit');

const { User } = require("../models/User");
const loger = require("../src/looger");
const { Company, addEmployeeToWaitingList } = require("../models/Companys");
const { responedList } = require("../respondList");

const saltPassword = 10;
const router = express.Router();

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send(responedList.InfoUnvalid);
    next('miss info been send to the register api');
    return;
  }
  User.findOne({ email: email })
    .catch(err => {
      next(err);
      res.status(403).send(responedList.DBError);
      return;
    })
    .then(user => {
      if (!user) {
        res.status(403).send(responedList.NotExists);
        loger('cant find user on login ' + email);
        return;
      }
      bcrypt.compare(password, user.password, (err, login) => {
        if (err) {
          next("password not right\n" + err);
          res.status(400).send(responedList.InfoUnvalid);
          return;
        } else {
          if (login) {
            loger("someone login to our web sucssesfull email: " + email);
            res.status(200).send(user);
            return;
          } else {
            next(req.ip + " just try login but not! password not good  :  " + email);
            res.status(400).send(responedList.InfoUnvalid);
            return;
          }
        }
      });


    })
});

router.post("/register", async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    next('miss info been send to the register api');
    res.status(404).send(responedList.InfoUnvalid);
    return;
  }
  // check email is legit 
  const legitEmail = await legit(email)
  if (!legitEmail.isValid) {
    next('email not valid');
    res.status(404).send(responedList.emailNotExistsL);
    return;
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {
    if (err) {
      next("err on register" + err);
      res.status(403).send(responedList.FaildSave);
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
          res.status(400).send(err.code === 11000 ? responedList.UserIsAlreadyCreated : responedList.FaildSave);
          next("someone try to register but got error : " + err);
          return;
        } else {
          loger("someone register to our web now this email : " + email);
          res.status(200).send(user);
        }
      });
    }
  });
});

router.post("/joincompany", async (req, res, next) => {




})

module.exports = router;