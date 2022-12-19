const express = require('express');

const expressEjsLayouts = require('express-ejs-layouts');

const path = require('path');

const port = 8000;

const app = express();

const db = require('./config/mongoose');

 

app.use(express.urlencoded({extended:false}));



app.use(expressEjsLayouts);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views')); 

app.use('/',require('./routes'));

// app.get('/',function(req,res){

//     return res.render('homePage');
// })

// app.post('/posts',function(req,res){

//     console.log(req.body);

//     return res.render('homePage');
// })

 
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