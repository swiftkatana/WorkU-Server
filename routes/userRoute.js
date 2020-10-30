const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/User");
const loger = require("../src/looger");
const { Company, addEmployeeToWaitingList } = require("../models/Companys");

const saltPassword = 10;
const router = express.Router();

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send('MissInfo');
    next('miss info been send to the register api');
    return;
  }

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      next(err);
      res.status(403).send({ err: "InfoWrong" });

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
          res.status(400).send({ err: "alreadyLogin" });
          return;
        } else {
          bcrypt.compare(password, user.password, (err, login) => {
            if (err) {
              next("password not right\n" + err);
              res.status(400).send({ err: "InfoWrong" });

            } else {
              if (login) {
                req.users[email] = email;
                loger("someone login to our web sucssesfull email: " + email);
                res.status(200).send({
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
                next(
                  req.ip +
                  " just try login but not! password not good  :  " +
                  email
                );
                res.status(400).send({ err: "InfoWrong" });

              }
            }
          });
        }
      } else {
        next(req.ip + " just try login but not! user not Found :  " + email);
        res.status(404).send({ err: "userNotCreate" });

      }
    }
  });
});

router.post("/register", async (req, res, next) => {
  const { email, password, firstName, lastName, companyName, permission, } = req.body;
  if (!email || !password || !firstName || !lastName || !companyName || !permission) {
    res.status(404).send('MissInfo');
    next('miss info been send to the register api');
    return;
  }

  let ceo = permission["ceo"] !== undefined;
  //if its ceo make sure that its really the first one on this company
  let newcompany, newWaitingList;
  if (ceo) {
    console.log("someone signin as cretor");
    let resF = await findAsy(Company, { name: companyName });
    if (resF.err === "notFound") {
      let newcompanyy = new Company({
        name: companyName,
        employees: { ceo: email },
      });
      // so in the end its will make sure that all is been save 
      newcompany = newcompanyy;
    } else {
      res.status(403).send("companyNameIsInUse");
      next('companyNameIsInUse')
      return;
    }
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {

    if (err) {
      res.status(403).send(err.message);
      next(err);
      return;
    }

    const user = new User({
      email,
      company: {
        name: companyName,
        status: !ceo ? "waiting" : "accept",
      },
      password: hash,
      firstName,
      lastName,
      role: ceo ? "ceo" : "default",
    });

    // if user have permission so add it 
    permission ? user.permission = permission : null;
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

      if (newcompany) {
        newcompany.save((err) => {
          if (err) {
            res.status(404).send("cantSave");

            next("someone try to register but got error : " + err);
            return;
          }
        })
      }
      if (!newcompany && companyName) {
        const data = await addEmployeeToWaitingList(companyName, user);
        if (data.err || data.message) {
          console.log('error on add a new employee to a copany', data);
          res.send('DBerror');
          return;
        } else {

          newWaitingList = data;
          newWaitingList.save(err => {
            if (err) {
              console.log('error on add a new employee to a copany', err);
              res.send('DBerror');
              return;
            }
          });
        }
      }
      user.save((err) => {
        if (err) {
          err.code === 11000 ? res.status(400).send("UserAlreadyExists") : res.status(404).send("cantSave");
          next("someone try to register but got error : " + err);
          newWaitingList ? newWaitingList.delete() : null
          newcompany ? newcompany.delete() : null
          return;
        } else {
          loger("someone register to our web now this email : " + email);
          res.status(200).send({
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

router.delete("/delete", async (req, res, next) => {
  //need to get in the req body a 2 things unique _id and is password
  const { password, email } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(403).send({ err: err || "useNotFound" });
      next({ err: err || "useNotFound" });
      return;
    } else {
      bcrypt.compare(password, user.password, async (err, login) => {
        if (err || !login) {
          res.status(403).send({ err: "WorngPassword" });
          next("password not right\n" + err);
          return;
        } else {
          if (user.permission["ceo"]) {
            let DocsOErr = await findAsy(Company, { name: user.company.name });
            if (DocsOErr.err || !DocsOErr) {
              res.status(403).send({ err: "DBError" });
              next("did not delete the company " + user.company.name + "\n" + DocsOErr.err || "not found company");
              return;
            } else {
              DocsOErr[0].delete();
            }
          }
          if (user.company.status !== 'decline') {

          }
          user.remove();
          res.status(403).send("success");

        }
      });
    }
  });
});
module.exports = router;

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
