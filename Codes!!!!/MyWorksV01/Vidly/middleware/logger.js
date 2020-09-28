const EventEmitter = require('events');
const os = require('os');




    log=(req,res,next)=>
    {
        console.log("somethibn happen from ip :"+req.ip);
      
        next();
   }



module.exports=log;