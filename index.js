const express = require('express');

const expressEjsLayouts = require('express-ejs-layouts');

const path = require('path');

const port = 8004;

const app = express();

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:false}));

app.use(expressEjsLayouts);

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views')); 

//creating cookie using express-session
app.use(session({
    
    name:"HR&R",
    secret: "hemanth&VenomCodes",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100000*60*100) 
    },
    store: new MongoStore({
        mongoUrl:'mongodb://localhost/majorDB',
        collectionName:'sessionCookies'
    })

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);


//making upload folder available to browser

app.use('/uploads',express.static(__dirname +"/uploads"));

app.use('/',require('./routes'));

 
app.listen(port,(err)=>{

    if(err){
        console.log("error in express",error);
    }
    
    console.log("express is running");

});
