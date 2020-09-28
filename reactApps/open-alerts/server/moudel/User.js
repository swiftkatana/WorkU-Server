

const mongoose = require('mongoose');

const {schemaOrder}= require( './orders')

const userSchema = new mongoose.Schema({
    userName:{type:String,unique:true},
    password:String,
    admin:{
        type:Boolean,
        default:false,
    },
    createDateOfUser:{ type:Date,default:Date.now},
    firstName:String,
    lastName:String,
    phone:String,
    address:String,
    orders:[schemaOrder],
});

exports.userSchema = userSchema; 
exports.User = mongoose.model("User", userSchema);
;
