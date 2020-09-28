const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const Joi = require('joi');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

if (!config.get('jwtPrivateKey')) {
    console.log("error not found jwtPrivateKey");
    process.exit(1);

}

//^^^Require!^^^
//My Modules!
const log = require("./middleware/logger");
//routes
const auth = require('./routes/auth');
const usersRoutes = require('./routes/Users');
const moviesRoute = require('./routes/movies');
const rentalsRoute = require('./routes/rentals');
const genresRoute = require('./routes/genres');
const customersRoute = require('./routes/customers');
const homePageRoute = require('./routes/homePage');
// Server
const app = express();;
//DataBase
mongoose.connect('mongodb+srv://SwiftKatana:kct13021@swiftkatana-3gw5v.mongodb.net/vidly?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to mongodb')).catch(error => console.log(error));

//schema for DB







// set page format
// app.set('view engine', 'pug');

/* *******MiddleWare  *****/


app.use(express.json());
app.use(express.urlencoded({ useNewUrlParser: true, extended: true }));
app.use(express.static((__dirname, '/public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static('public'));
app.use(log);
app.use(helmet());
//**********routes!*************
app.use('/api/user', usersRoutes);
app.use('/api/genres', genresRoute);
app.use('/api/customers', customersRoute);
app.use('/api/movies', moviesRoute);
app.use('/api/rentals', rentalsRoute);
app.use('/wellcome', homePageRoute);
app.use('/', homePageRoute);
app.use('/api/auth', auth);




//What Mode i am

if (app.get("env") === "development") {
    app.use(morgan("combined"));
    console.log("morgan is enable");

}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<PORT>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

app.listen(config.get('Port'), () => console.log(`you are listen to Port ${config.get('Port')}`));




//Exercises