const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')

// app.set('view engine', 'ejs');

app.use('/assets', express.static('./assets'))


// app.use(function(req, res, next) {
//     res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
// });
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ useNewUrlParser: true }));
app.use(express.static('public'));

let usersOnServer = [];


rest = () => {
    usersOnServer.splice(0, usersOnServer.length);
}

updateUsersOnServer = (ip) => {

    if (usersOnServer.indexOf(ip) == -1) { usersOnServer.push(ip); };


};




app.get('/', function(req, res) {
    console.log(req.url);
    res.sendFile(__dirname + "/SnakePage.html");
});

app.post('/updatecount', function(req, res) {
    console.log(req.body.user);
    updateUsersOnServer(req.ip);
});

app.get('/getusers', function(req, res) {
    res.send({ amount_of_users: usersOnServer.length });

    // 
});



app.listen('1029', () => {
    console.info(`server started on port 1029)`);
    setInterval(rest, 3000);
});














// type nodemon server for start the server on update mode