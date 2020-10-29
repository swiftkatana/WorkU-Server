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
          company,
          role,
          fullName,
          permission,
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
                  permission,
                  role,
                  email,
                  id: _id,
                  firstName,
                  lastName,
                  imageProfile,
                  company,
                  fullName,
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

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    companyName,
    permission,
  } = req.body;
  let creator = permission.indexOf("creator") >= 0;

  looger(req.ip + " just enter our register  page ");
  bcrypt.hash(password, saltPassword, (err, hash) => {
    if (err) {
      looger(err);
      res.send(err.message);
      res.status(404);
    }
    //if its creator make sure that its really the first one on this company
    if (creator) {
      console.log("someone signin as cretor");
      Com;
    }
    const user = new User({
      email,
      company: {
        name: companyName,
        status: creator ? "accept" : "waiting",
      },
      password: hash,
      firstName,
      lastName,
    });
    permission ? user.permission.push(...permission) : null;
    {
      const {
        _id,
        imageProfile,
        tasks,
        role,
        company,
        fullName,
        permission,
      } = user;

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
            role,
            email,
            id: _id,
            firstName,
            lastName,
            fullName,
            imageProfile,
            tasks,
            company,
            permission,
            DOYBC: user.createDateOfUser,
          });
        }
      });
    }
  });
});

router.delete("/delete", (req, res) => {
  //need to get in the req body a 2 things unique _id and is password
  const { password, email } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      looger(err);
      res.send({ err: err || "useNotFound" });
      res.status(404);
    } else {
      bcrypt.compare(password, user.password, (err, login) => {
        if (err || !login) {
          looger("password not right\n" + err);
          res.send({ err: "WorngPassword" });
          res.status(404);
        } else {
          user.remove();
          res.send("success");
        }
      });
    }
  });
});
module.exports = router;
