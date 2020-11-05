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
require("./src/Middlewares")(app);

//socket
const users = {};

//Routs
app.use(

  "/api/user",
  (req, res, next) => {
    req.users = users;
    next();
  },
  userRoute
);
app.use('/api/company')
// setup server to listen

console.clear()
console.log('-----------------------------------------------------------------------------------')
const PORT = process.env.PORT || 1029;
server.listen(PORT, () => {
  console.log(`Server  listen to port ${PORT} `);
});