const { requestChecker } = require("./models/User");

module.exports = (app) => {
  const express = require("express");
  const bodyParser = require("body-parser");

  app.use(express.static("uploads"));
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
};
