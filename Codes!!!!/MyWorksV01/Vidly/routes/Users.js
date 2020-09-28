const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const log = require("../middleware/logger");


const routerG = express.Router();


routerG.get('/me', auth, async(req, res) => {

    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});



routerG.get('/login', async(req, res) => {

    res.sendFile("D:/MyWorks/Vidly/public/html/login.html");
});




routerG.get('/register', async(req, res) => {

    res.sendFile("D:/MyWorks/Vidly/public/html/register.html");

});


routerG.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);



    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('user already registered');




    user = new User(_.pick(req.body, ['name', 'lastName', 'email', 'userName', 'password', 'phone']));
    console.log(_.pick(req.body, ['name', 'lastName', 'email', 'userName', 'password', 'phone']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'lastName', 'username', 'email']));
});












module.exports = routerG;