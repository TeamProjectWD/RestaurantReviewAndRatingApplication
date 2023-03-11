const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User')
const Hotel = require('../model/hotelModel')

//intilizing passport local strategy
passport.use('local-user',new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email: email},function(err,user){
            if(err){
                return done(err);
            }
            if(!user || user.password  != password){
                
                return done(null,false);
            }
            return done(null,user);
        })
    }
));


passport.use('local-hotel',new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        console.log("test1");

        Hotel.findOne({email: email},function(err,hotel){
            if(err){
                return done(err);
            }
            console.log("test2");
            if(!hotel || hotel.password  != password){

                console.log("error +++++++++++++++++++++++++++++++");
                
                return done(null,false);
            }
            return done(null,hotel);
        })
    }
));

//encrypting user

passport.serializeUser(function(user,done){
    console.log("in serializer",user.id);
    done(null,user.id);
})
//decrypting user
passport.deserializeUser(async function(id,done){
    
    const user = await User.findById(id);
    if(user){
        return done(null,user);
    }
    else{
        const user2 = await Hotel.findById(id);
        return done(null,user2);
    }
    
});

//checking wheather user is logged in and cookie is active
passport.checkAuthentication  = function(req,res,next){
    
    if(req.isAuthenticated()){
        console.log("inside checkAuthentication");
        return next();
    }
    return res.redirect('/user/signIn');
}

//making user object from passport available for locals
passport.setAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;