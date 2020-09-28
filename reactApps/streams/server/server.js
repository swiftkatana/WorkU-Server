require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt =require('bcrypt');
const mongoose = require("mongoose");
var cors = require('cors');

 const {Stream} = require('./src/models/stream');
 const {User} = require("./src/models/user");

const app = express();

const saltPassword = 10;
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://84.108.78.137:1029");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();
  });
  

  
mongoose.connect(process.env.DB_mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected to mongodb')).catch(error => console.log(error));



app.post('/newStream',(req,res)=>{

  console.log("create strean : "+req.body.userId );
    const stream = new Stream({
        userId:req.body.userId,
        title:req.body.title,
        description:req.body.description,
        userName:req.body.userName
    });


    stream.save(()=>{
res.send(stream);
    });

});

app.get('/streams',(req,res)=>{
    console.log("got all streams")
Stream.find({},(err,Streams)=>{
    res.send(Streams);
})

});

app.get('/stream/:id',(req,res)=>{
    console.log(req.params.id)
    const id = req.params.id;
    Stream.findById({_id:id},(err,foundStream)=>{

        if(err) res.send( err);

        if(!foundStream) res.send("Stream Not Found");

        res.send(foundStream);

    });
  
    });
    
    
    
app.delete('/streams/delete/:_id',(req,res)=>{
    const id = req.params._id;
    console.log("delete try on: "+id)
 Stream.deleteOne({ _id: id }, function (err) {
    if (err){ console.log(err); res.send(err)}
  });
  
    });
    
    app.put('/streams/edit/',(req,res)=>{
        const id = req.body.id;
        const updateStream = req.body.formValues;
        console.log(id)
        console.log(updateStream)
        Stream.findOne({_id:id},(err,foundStream)=>{
            if(err) res.send(err);
    if(foundStream){
            foundStream.title=updateStream.title;
            foundStream.description=updateStream.description;
            foundStream.save(()=>res.send(foundStream));
        }else{
    res.send("not found")
     }
       });
    });



    
app.post("/register", (req, res) => {

    console.log(req.ip + " just register to our web ");
    
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.firstName;
    const userLastName = req.body.LastName;


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
        });

        user.save(err=>{
            if(err){
                console.log(err);
                if(err.code===11000)     res.send("dup");
               else res.send(err.message);
            }else{
                res.send(user);
            }

        });



    });


});



app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  console.log(email)
    User.findOne({userName:email},(err,user)=>{
        if(err){
            console.log(err);
            res.send(err.message);
        }else{
            if(user){
                bcrypt.compare(password,user.password,(err,login)=>{
                    if(err){
                        console.log(err);
                        res.send(err.message);
                    }else{
                        res.send(user);
                    }

                });

            }
            else res.send('not found')
        }



    });
  
   
    console.log(req.ip + " just try login but not! ");
});
    




app.listen(process.env.PORT, () => {
    console.log("the server is listen to port " + process.env.PORT );
});