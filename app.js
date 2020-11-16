require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/TaskAndPR-Route");
const companyRoute = require('./routes/companyRoute')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});
let message = {
  from: 'Nodemailer <example@nodemailer.com>',
  to: 'Nodemailer <example@nodemailer.com>',
  subject: 'AMP4EMAIL message',
  text: 'For clients with plaintext support only',
  html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
  amp: `<!doctype html>
  <html ⚡4email>
    <head>
      <meta charset="utf-8">
      <style amp4email-boilerplate>body{visibility:hidden}</style>
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
    </head>
    <body>
      <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
      <p>GIF (requires "amp-anim" script in header):<br/>
        <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
    </body>
  </html>`
}

transporter.sendMail(message)
// let transporter = nodemailer.createTransport(transport, null)

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