const express = require('express');

const expressEjsLayouts = require('express-ejs-layouts');

const path = require('path');

const port = 8000;

const app = express();

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport');

const MongoStore = require('connect-mongo');

//to encode url

app.use(express.urlencoded({extended:false}));

app.use(expressEjsLayouts);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views')); 

//creating cookie using express-session and stroing session in Mongostore to prevent users from logging out while the server restarts
app.use(session({
    
    name:"HR&R",
    secret: "hemanth&VenomCodes",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100000*60*100) 
    },
    //address for storing cookie in DB
    store: new MongoStore({
        mongoUrl:db._connectionString,
        collectionName:'sessionCookies'
    })

}));

//starting the passport authentication
app.use(passport.initialize());
//passport session intialization
app.use(passport.session());
//making active user avaliable for views
app.use(passport.setAuthenticated);


//making upload folder available to browser

app.use('/uploads',express.static(__dirname +"/uploads"));

app.use('/assets',express.static(__dirname+"/assets"));

//seperate directory for routes
app.use('/',require('./routes'));

 
app.listen(port,(err)=>{

    if(err){
        console.log("error in express",error);
    }
    
    console.log("express is running");

});
