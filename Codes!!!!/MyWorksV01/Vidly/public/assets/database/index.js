const mongoose = require('mongoose');

mongoose.Promise=global.Promise;

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});





const connection =mongoose.connection;



connection.then((db)=>
{
  console.log('connection to the database was successful!');

}).catch((err)=>
{
console.log('there was an error connectuon to the database!@!!! ',err);
});


