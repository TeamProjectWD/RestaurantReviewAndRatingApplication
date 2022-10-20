const express = require('express');

const path = require('path');

const port = 8000;

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use('/',require("./routes"));




 

app.listen(port,(err)=>{

    if(err){
        console.log("error in express",error);
    }
    
    console.log("express is running");

});



 

// server.listen(port,function(err){
    
//     if(err){
//         console.log(err);
//         return;
//     }

//     console.log("yes running")

     

// });