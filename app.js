require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/TaskAndPR-Route");
const companyRoute = require("./routes/companyRoute");
const userChangePer = require("./routes/userCangesRoute");
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");

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

app.get("/", (req, res) => {
  console.log("dsa");
  res.sendFile(__dirname + "/public/welcome/index.html");
});

//Routs
app.use("/api/user", userChangePer);
app.use("/api/user", userRoute);
app.use("/api/company", taskRoute);
app.use("/api/company", companyRoute);
// setup server to listen

console.clear();
console.log(
  "-----------------------------------------------------------------------------------"
);
const PORT = process.env.PORT || 1029;
server.listen(PORT, () => {
  console.log(`Server  listen to port ${PORT} `);
});

// socket area !!!
setInterval(
  () => console.log("amount of users connected  :", Object.keys(users).length),
  600000
);

io.on("connect", (socket) => {
  socket.on("loginToTheWebSite", (email) => {});

  socket.on("message", ({ type, data, to }) => {
    console.log(type);
    switch (type) {
      case "loginToTheWebSite":
        //if anyone is logged in with this username then refuse
        if (users[data]) {
          socket.emit("test" + data, "test");

          //save user socket on the server
          users[data].emit("kickOut" + data);
          users[data] = socket;
          socket.email = data;
          console.log("User logged:", data);
        } else {
          //save user socket on the server
          users[data] = socket;
          socket.email = data;
          console.log("User logged:", data);
        }

        break;
      case "logout":
        if (socket.email) {
          console.log("user is logout from server", socket.email);
          delete users[socket.email];
        }
        break;
      case "updateTaskVoice":
        io.emit("updateTaskVoice" + to, data);
        break;
      case "newTaskSend":
        io.emit("newTaskGot" + to, data);
        break;
      case "updateOrNewPersonalRequest":
        io.emit("updateOrNewPersonalRequest" + to, data);
        break;

      case "taskStatusChange":
        io.emit("taskStatusChange" + to, data);
        break;
      case "employeeSendShift":
        data.email = socket.email;
        io.emit("managerGotShift" + to, data);
        break;
      case "managerSendFinalShift":
        io.emit("employeeGotFinalShift" + to, data);
        break;
      case "joinCompany":
        io.emit("newEmployee" + to, data);
        break;
      default:
        console.log("default case:", { type, data, to });
        break;
    }
  });

  socket.on("disconnect", () => {
    if (socket.email) {
      console.log("user is disconnected from server", socket.email);
      delete users[socket.email];
    }
  });
});
