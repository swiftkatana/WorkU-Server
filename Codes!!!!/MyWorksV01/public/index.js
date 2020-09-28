var express = require("express");

var todoController = require('./controlers/todoControler');

var app = express();


//set up template engine
app.set('view engine',"ejs");


//static files

app.use(express.static('./public'));





//fire controlers
todoController(app);
//listen to port

app.listen(1029);
console.log('you are listenig to port 1029');