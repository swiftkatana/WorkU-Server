require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/TaskAndPR-Route");
const companyRoute = require('./routes/companyRoute')
const userChangePer = require('./routes/userCangesRoute');
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

app.get('/', (req, res) => {
  console.log('dsa');
  res.sendFile(__dirname + "/public/welcome/index.html");
})


//Routs
app.use("/api/user", userChangePer);
app.use("/api/user", userRoute);
app.use('/api/company', taskRoute)
app.use('/api/company', companyRoute)
// setup server to listen

console.clear()
console.log('-----------------------------------------------------------------------------------')
const PORT = process.env.PORT || 1029;
server.listen(PORT, () => {
  console.log(`Server  listen to port ${PORT} `);
});

// socket area !!!
setInterval(() => console.log('amount of users connected  :', Object.keys(users).length), 600000)

io.on('connect', (socket) => {
   socket.on('loginToTheWebSite', email => {
     console.log('socket try login')
      //if anyone is logged in with this username then refuse 
      if (!users[email]) {

         //save user socket on the server 
         users[email] = socket;
         socket.email = email;
         console.log("User logged:", email);
         socket.send(true);
      }
   });
   socket.on('message', data => {
      console.log('message', data)
   })

  
   socket.on('test', (data) => {
  console.log('dada');
 });




   socket.on('chat', (data) => {
      if (!rateLimit.CheackRateLimit(data.senderId, 10000)) {
         return null
      }
      io.sockets.emit('chat' + data.chatId, data);
      addMessageToAChat(data);
   });


  

   socket.on('disconnect', () => {

      if (socket.email) {
         delete users[socket.email];
        console.log('user is disconnected from server');
      }
   });





});
