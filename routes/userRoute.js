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
  if (req.users[email]) {
    res.status(400).send(responedList.loginFaildAlreadyConnect);
    return;
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      next(err);
      res.status(403).send(responedList.InfoUnvalid);

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

        bcrypt.compare(password, user.password, (err, login) => {
          if (err) {
            next("password not right\n" + err);
            res.status(400).send(responedList.Info);

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
              res.status(400).send(responedList.InfoUnvalid);

            }
          }
        });

      } else {
        next(req.ip + " just try login but not! user not Found :  " + email);
        res.status(404).send(responedList.UserNotCreated);

      }
    }
  });
});

router.post("/register", async (req, res, next) => {
  const { email, password, firstName, lastName, companyName, permission, expoId } = req.body;
  if (!email || !password || !firstName || !lastName || !companyName || !permission) {
    next('miss info been send to the register api');
    res.status(404).send(responedList.InfoUnvalid);
    return;
  }
  const legitEmail = await legit(email)
  if (!legitEmail.isValid) {

    next('email not valid');
    res.status(404).send(responedList.emailNotExistsL);
    return;

  }

  let ceo = permission["ceo"] !== undefined;
  //if its ceo make sure that its really the first one on this company
  let newcompany, newWaitingList;
  if (ceo) {
    console.log("someone signin as cretor");
    let resF = await findAsy(Company, { name: companyName });
    if (resF.err) {
      let newcompanyy = new Company({
        name: companyName,
        employees: { ceo: email },
      });
      // so in the end its will make sure that all is been save 
      newcompany = newcompanyy;


    } else {
      next('companyNameIsInUse')
      res.status(403).send(responedList.companyNameExists);
      return;
    }
  }
  bcrypt.hash(password, saltPassword, async (err, hash) => {

    if (err) {
      next("err on register" + err);
      res.status(403).send(responedList.UnvalidPassword);
      return;
    }

    const user = new User({
      email,
      company: {
        name: companyName,
        status: !ceo ? "waiting" : "accept",
      }, expoId: expoId || '',
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
            next("someone try to register but got error Line:149 : " + err);
            res.status(404).send(responedList.FaildSave);
            return;
          }
        })
      }

      // if the employee give the comapany that he want i will add him to the company waiting list
      if (!newcompany && companyName) {
        let didAddToTheCompany = await Company.findOne({ name: companyName }).then(doc => {
          if (!doc) {
            console.log(companyName, doc)
            return responedList.NotExists;
          }

          return doc.AddToTheWaitingList(newEmployee);

        }).catch(err => {

          console.log(err)
          return error.code === 11000 ? responedList.isInUse : responedList.DBError
        })

        if (didAddToTheCompany.err) {
          console.log('error on add a new employee to a copany', data.err);
          res.send(data.err);
          return;
        } else {

          newWaitingList = didAddToTheCompany;
          newWaitingList.save(err => {
            if (err) {
              console.log('error on add a new employee to a copany', err);
              res.send(responedList.DBError);
              return;
            }
          });
        }
      }
      //------------------------------------------------------------

      user.save((err) => {
        if (err) {
          err.code === 11000 ? res.status(400).send("UserAlreadyExists") : res.status(404).send(responedList.FaildSave);
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
  //need to get in the req body a 2 things email and is password
  const { password, email } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(403).send(responedList.UserNotCreated);
      next({ err: err || "useNotFound" });
      return;
    } else {
      bcrypt.compare(password, user.password, async (err, login) => {
        if (err || !login) {
          res.status(403).send(responedList.UnvalidPassword);
          next("password not right\n" + err);
          return;
        } else {
          if (user.permission["ceo"]) {
            let DocsOErr = await findAsy(Company, { name: user.company.name });
            if (DocsOErr.err || !DocsOErr) {
              res.status(403).send({ err: responedList.DBError });
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
        return { err };
      }
    })
    .then((doc) => {
      return doc.length <= 0 ? responedList.DBError : doc;
    });
};
