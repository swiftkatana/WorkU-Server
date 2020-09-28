const express = require('express');
const mongoose = require('mongoose');





// Server
const app = express();;


//DataBase
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to mongodb')).catch(error => console.log(error));






app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});








//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<PORT>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const port = process.env.PORT || 1029;
app.listen(port, () => console.log(`you are listen to Port ${port}`));