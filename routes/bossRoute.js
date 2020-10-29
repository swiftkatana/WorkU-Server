const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

router.post("/addTask", (req, res) => {
  // this route need to get sender(who that create the task) as a obj example{ firstName:" example" , email:"example",} ;
  // and array of workers example [{email:example1@example.com,fullName:"example1 example1"},...]
  let workers = req.body.workers || [];
  let sender = req.body.sender;

  const emails = workers.map((user) => user.email);

  User.find({ email: { $in: emails } });
});
