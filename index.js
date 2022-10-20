const express = require('express');

const port = 8000;

const app = express();


app.get('/',function(req,res){

    res.end("hello bro");
})

app.listen(port,()=>{
    
    console.log("express is running");
})



 

// server.listen(port,function(err){
    
//     if(err){
//         console.log(err);
//         return;
//     }

//     console.log("yes running")

     

// });