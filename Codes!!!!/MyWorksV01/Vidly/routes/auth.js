const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User } = require('../models/user');
const log = require("../middleware/logger");
const bcrypt = require('bcrypt');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const routerG = express.Router();








routerG.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);



    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('invalid email or password');


    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('invalid email or password');



    const token = user.generateAuthToken();

    res.send(token);

});








validate = (req) => {
    const schema = {

        email: Joi.string().min(10).max(50).required(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(req, schema);
};







module.exports = routerG;