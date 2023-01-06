const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User')
//intilizing passport local strategy
passport.use(new LocalStrategy({
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

//encrypting user

passport.serializeUser(function(user,done){
    done(null,user.id);
})
//decrypting user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("err in user finding");
            return done(err);
        }
        
        return done(null,user);

    });
});

//checking wheather user is logged in and cookie is active
passport.checkAuthentication  = function(req,res,next){
    
    if(req.isAuthenticated()){
   
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