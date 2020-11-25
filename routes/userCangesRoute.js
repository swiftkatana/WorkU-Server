const express = require("express");
const bcrypt = require("bcrypt");
const legit = require("legit");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
path = require("path");

const { User } = require("../models/User");
const loger = require("../src/looger");
const { updateExpoId } = require("../models/Companys");
const { responedList } = require("../respondList");
const looger = require("../src/looger");
const saltPassword = 10;
const router = express.Router();

var transporter = nodemailer.createTransport({
  service: "Gmail ",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

router.post("/login", (req, res) => {
  const { email, password, expoId } = req.body;
  if (!email || !password) {
    res.send(responedList.infoInvalid);

    return;
  }

  User.findOne({ email: email })
    .catch((err) => {
      res.send(responedList.DBError);
      return;
    })
    .then((user) => {
      if (!user) {
        res.send(responedList.usersNotFound);

        return;
      }
      bcrypt.compare(password, user.password, async (err, login) => {
        if (err) {
          res.send(responedList.infoInvalid);
          return;
        } else {
          if (login) {
            if (user.expoId !== expoId) {
              console.log("new expo id");
              if (user.Company) {
                let err = await updateExpoId({
                  expoId,
                  name: user.Company,
                  email: user.email,
                });
                if (err.err) {
                  res.send(err);
                  return;
                }
              }
              user.expoId = expoId;
              user.markModified("expoId");
              user.save((err) => {
                if (err) {
                  res.send(responedList.FaildSave);
                  return;
                }
              });
            }

            res.send(user.filterUser());
            return;
          } else {
            res.send(responedList.infoInvalid);
            return;
          }
        }
      });
    });
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName, phone, expoId } = req.body;
  if ((!email || !password || !firstName || !lastName, !phone)) {
    res.send(responedList.infoInvalid);
    return;
  }
  // check email is legit
  const legitEmail = await legit(email);
  if (!legitEmail.isValid) {
    loger("email not valid");

    res.send(responedList.emailNotExistsL);
    return;
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {
    if (err) {
      res.send(responedList.FaildSave);
      return;
    }
    const user = new User({
      email,
      password: hash,
      firstName,
      lastName,
      phone,
      expoId,
    });
    {
      user.save((err) => {
        if (err) {
          res.send(
            err.code === 11000
              ? responedList.UserIsAlreadyCreated
              : responedList.FaildSave
          );

          return;
        } else {
          res.send(user.filterUser());
        }
      });
    }
  });
});

router.post("/changepassword", async (req, res) => {
  let { newPassword, oldPassword, email } = req.body;

  if (!newPassword || !oldPassword || !email) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (user.err) {
    res.send(user);
    return;
  }

  bcrypt.compare(oldPassword, user.password, (err, login) => {
    if (err) {
      res.send(responedList.infoInvalid);
      return;
    } else {
      if (!login) {
        res.send(responedList.infoInvalid);
        return;
      }

      bcrypt.hash(newPassword, saltPassword, (err, hash) => {
        if (err) {
          res.send(responedList.infoInvalid);
          return;
        }

        user.password = hash;
        user.save((err) => {
          if (err) {
            res.send(responedList.FaildSave);

            return;
          } else {
            res.send("good");
          }
        });
      });
    }
  });
});

router.post("/restpasswordrestcode", async (req, res) => {
  let { email, restCode, newPassword } = req.body;

  if (!email || !restCode || !newPassword) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (user.err) {
    res.send(user);
    return;
  }

  if (String(user.RESTPASW).trim() !== String(restCode).trim()) {
    res.send(responedList.NotExists);
    return;
  }
  bcrypt.hash(newPassword, saltPassword, async (err, hash) => {
    if (err) {
      res.send(responedList.DBError);
      return;
    }
    user.password = hash;
    user.RESTPASW = "";

    user.save((err) => {
      if (err) {
        res.send(responedList.FaildSave);
        return;
      }

      res.send(user.filterUser());
    });
  });
});

router.post("/createrestpasswordcode", async (req, res) => {
  let { email } = req.body;

  if (!email) {
    res.send(responedList.infoInvalid);
    return;
  }

  let user = await User.findOne({ email })
    .catch((err) => responedList.DBError)
    .then((doc) => doc || responedList.usersNotFound);
  if (user.err) {
    res.send(user);
    return;
  }

  let restCode = Math.floor(
    Math.random() * (999999990000000 - 1000009999999) + 1000009999999
  )
    .toString()
    .replace("3", "th3210ty")
    .replace("6", "ghew#!");
  user.RESTPASW = restCode;

  user.save((err) => {
    if (err) {
      res.send(responedList.FaildSave);
    } else {
      ejs.renderFile(
        path.join(__dirname, "../src/restPassword.ejs"),
        { name: user.fullName, restCode },
        function (err, data) {
          if (err) {
            console.log(err);
            res.send(responedList.DBError);
            return;
          }
          var mailOptions = {
            from: "WorkUsuppurt@gmail.com",
            to: email,

            subject: "בקשתה לשנות סיסמה ",
            html: data,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send(responedList.DBError);
              console.log(error);
            } else {
              res.send("good");
              console.log("Email sent: " + info.response);
            }
          });
        }
      );
    }
  });
});

module.exports = router;
