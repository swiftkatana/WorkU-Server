require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt =require('bcrypt');
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path')
const compression = require('compression');
const { BlobServiceClient } = require("@azure/storage-blob");
 const fs = require('fs');


const account = "storageformycolrs";
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net${process.env.SAS}`
);
const containerName = "containerformycolrs";
 







 
const app = express();


const saltPassword =10;
 
let bansIp=[];
 
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
      callback(null,file.originalname+'d.WebP');
    }
  });
  
  var upload = multer({ storage : storage }).any('photos',10);

  var dir = path.join(__dirname, 'public');


    app.disable("x-powered-by")

    app.use(compression());

    app.use(express.static(dir));
  
     app.use(express.static(path.join(__dirname, 'build')));

    app.use(express.json());

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

        next();
    });
  

  
mongoose.connect(process.env.DB_mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to mongodb')).catch(error => console.log(error));

app.post('/calls/filter',(req,res)=>{
    const filter = req.body.filter
    console.log(filter)
    fs.readFile('calls.txt', 'utf8', function(err, data) {
        if (err) throw err;
        let callsArry =data.split('\n').filter(cal=>cal&&cal.match(filter));
       
        res.send(callsArry)
      });


});



app.get('/allcalls',(req,res)=>{
    
    fs.readFile('calls.txt', 'utf8', function(err, data) {
        if (err) throw err;
        let callsArry =data.split('\n').filter(cal=>cal);
       
        res.send(callsArry)
      });


});


app.post('/addCall',(req,res)=>{
    console.log(req.body)
    // 0=id 1=title 2=body 3=level 4=state if its open or close 5=Date  
    let text= `${Date.now()}<@>${req.body.title}<@>${req.body.body}<@>${req.body.level}<@>open<@>${req.body.date}\n`;

    
    

    fs.appendFile('calls.txt',text, function (err) {
        if (err) {
        console.log( err);
        res.send('error');
        }else{
            console.log('Saved!');
            res.send(text)
        }
      });

   
    
});


























app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  console.log(email  +" try to eneter")
    User.findOne({userName:email},(err,user)=>{
        if(err){
            console.log(err);
            res.send('not found');
        }else{
            if(user){
                bcrypt.compare(password,user.password,(err,login)=>{
                    if(err){
                        console.log('eror')
                        console.log(err);
                        console.log(login)
                        res.send('not found');
                    }else{
                       if(login){
                           console.log('someone login to our web sucsses email: '+email)
                                res.send({
                                            _id:user._id,
                                            email,
                                            firstName:user.firstName,
                                        lastName: user.lastName,
                                        phone:user.phone,
                                        address:user.address,
                                        admin:user.admin

                                });
                         }else {
                            console.log(req.ip + " just try login but not! password not good  :  "+email);
                            res.send('not found');

                         }

                    }

                }); 

            }
            else {
    console.log(req.ip + " just try login but not! user not found :  "+email);
                
                res.send('not found')}
        }



    });
  
   
});
  
app.post("/register", (req, res) => {

    console.log(req.ip + " just enter our register  page ");
    
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.firstName;
    const userLastName = req.body.LastName;
    const phone = req.body.phone;
    const address = req.body.address;

    bcrypt.hash(password,saltPassword,(err,hash)=>{
        if(err){
            console.log(err);
            res.send(err.message);
        }



        const user = new User({
            userName:email,
        password:hash,
        firstName:username,
        lastName:userLastName,
        phone,
        address
        });

        user.save(err=>{
            if(err){
                console.log("someone try to register but got error : "+err);
                if(err.code===11000)     res.send("dup");
               else res.send(err.message);
            }else{
                console.log('someone register to our web now this email : '+email)
                res.send({
                    _id:user._id,
                    email,
                    firstName:username,
                   lastName: userLastName,
                   phone,
                   address,
                   admin:user.admin
                });
            }

        });



    });


});



const port = process.env.PORT || 1028;


app.listen(port, () => {
    console.log("the server is listen to port " + port );
});