const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");
const looger = require("../src/looger");

const saltPassword = 10;
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      looger(err);
      res.send({ err: "InfoWrong" });
      res.status(404);
    } else {
      if (user) {
        const {
          email,
          _id,
          firstName,
          lastName,
          imageProfile,
          connections,
        } = user;
        if (req.users[email]) {
          res.send({ err: "alreadyLogin" });
          res.status(404);

          res.end();
        } else {
          bcrypt.compare(password, user.password, (err, login) => {
            if (err) {
              looger("password not right\n" + err);
              res.send({ err: "InfoWrong" });
              res.status(404);
            } else {
              if (login) {
                looger("someone login to our web sucssesfull email: " + email);
                res.send({
                  email,
                  _id,
                  firstName,
                  lastName,
                  imageProfile,
                  friends: connections,
                  DOYBC: user.createDateOfUser,
                });
              } else {
                looger(
                  req.ip +
                    " just try login but not! password not good  :  " +
                    email
                );
                res.send({ err: "InfoWrong" });
                res.status(404);
              }
            }
          });
        }
      } else {
        looger(req.ip + " just try login but not! user not Found :  " + email);
        res.send({ err: "userNotCreate" });
        res.status(404);
      }
    }
  });
});

router.post("/register", (req, res) => {
  const { email, password, firstName, lastName, companyName } = req.body;
  looger(req.ip + " just enter our register  page ");
  bcrypt.hash(password, saltPassword, (err, hash) => {
    if (err) {
      looger(err);
      res.send(err.message);
      res.status(404);
    }

    const user = new User({
      email,
      companyName,
      password: hash,
      firstName,
      lastName,
      role: req.body.role,
    });
    const { _id, imageProfile, connections, tasks, role } = user;

    user.save((err) => {
      if (err) {
        looger("someone try to register but got error : " + err);
        if (err.code === 11000) {
          res.send("dup");
          res.status(400);
          res.end();
        } else res.send(err.message);
      } else {
        looger("someone register to our web now this email : " + email);
        res.send({
          email,
          role,
          id: _id,
          firstName,
          lastName,
          imageProfile,
          tasks,
          connections,
          DOYBC: user.createDateOfUser,
        });
      }
    });
  });
});

module.exports = router;
