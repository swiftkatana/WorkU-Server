module.exports = (app) => {
  const express = require("express");
  const bodyParser = require("body-parser");

  app.use(express.static("public"));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  //error check 
  app.use('/api/user/addTask', (req, res, next) => {
    if (!req.body.workers || !req.body.sender || !req.body.title) {
      next("didnt find users on the add new Task Route");
      res.status(404).send(errorList.InfoUnvalid);
      return;
    }
    next();
  })
};

