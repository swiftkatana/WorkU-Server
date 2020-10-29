require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

// set DB
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(
  process.env.DB_mongodb,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    err ? console.log(err) : console.log("connect to MongoDb Server");
  }
);

//static files and MiddleWare
require("./src/AppUses")(app);

//Routs
app.use(
  "/api/user",
  (req, res, next) => {
    req.users = {};
    next();
  },
  userRoute
);
// setup server to listen

const PORT = process.env.PORT || 1029;
console.clear();
server.listen(PORT, () => {
  console.log(`Server  listen to port ${PORT} `);
});

// test
