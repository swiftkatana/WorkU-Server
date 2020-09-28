const express = require("express");
const bodyParser = require("body-parser");;;

const app = express();





app.get("/", function(req, res) {
    res.sendfile(__dirname + "/game.html");

});



app.listen(1029, () => {
    console.log("the server is listen to port " + 1029);
});