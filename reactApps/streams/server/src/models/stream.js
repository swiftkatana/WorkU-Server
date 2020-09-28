const mongoose = require('mongoose');


const streamSchema =new mongoose.Schema({
    userId:String,
    title:String,
    description:String,
    id:String,
    userName:String

});

 const Stream = mongoose.model("stream",streamSchema);


 exports.Stream = Stream;