const express = require('express');

const app =express();
var howmanyEpsodesPass=2;
// let arr =[10,100,650,25,5,50];
// arr.forEach(n =>setTimeout(()=>console.log(n),n))
goToSleep=()=>{
const howMuchTimeToSleep =16500000;
    for(var i =0;i<howMuchTimeToSleep;i++){
        console.log(howMuchTimeToSleep-i);
    }


    var spawn = require('child_process').spawn,
ls    = spawn('cmd.exe', ['/c', 'sleep.bat']);

ls.stdout.on('data', function (data) {
console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
console.log('stderr: ' + data);
});

ls.on('exit', function (code) {
console.log('child process exited with code ' + code);
});
}

app.get('/',(req,res)=>{
    console.log(req)
console.log('workk');
if(howmanyEpsodesPass===2){
    howmanyEpsodesPass=0;
    console.log('res');
    goToSleep()
}
howmanyEpsodesPass++

});

const port = process.env.PORT || 1028;


app.listen(port, () => {
    console.log("the server is listen to port " + port );
});


goToSleep()