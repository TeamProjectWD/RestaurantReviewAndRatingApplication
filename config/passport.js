const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User')
const Hotel = require('../model/hotelModel')
const Follow = require('../model/follow');

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


// google oauth20

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID ='322329409826-t2uajqpo39tkgu4vus3bp2f4d1vmm4jj.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET ='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';
passport.use('userGoogle',new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/user/google/callback",
    passReqToCallback:true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOne({ googleId: profile.id }, async function (err, user) {
        if (err) { return cb(err); }
        if (!user) {
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password:profile.id
          });
            let follow = await Follow.create({
            user:newUser.id,
            UserOrHotel:'User'
            })

            newUser.follow = follow;
            newUser.avatar = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
 
            newUser.save(function (err) {
            if (err) { return cb(err); }
            return cb(null, newUser);
          });
        } else {
            // console.log(user);
          return cb(null, user);
        }
      });
    }
));

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID_Hotel ='322329409826-vbk1b2v67pvpgi3m9tep6s9li98en729.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET_Hotel ='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';
passport.use('hotelGoogle',new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID_Hotel,
    clientSecret: GOOGLE_CLIENT_SECRET_Hotel,
    callbackURL: "/hotel/google/callback",
    passReqToCallback:true
  },
  function(request,accessToken, refreshToken, profile, cb) {
    console.log(profile);
    Hotel.findOne({ googleId: profile.id }, async function (err, user) {
        if (err) { return cb(err); }
        if (!user) {
          const newUser = await Hotel.create({
            name: "Change Name",
            email: profile.emails[0].value,
            googleId: profile.id,
            password:profile.id
          });
            let follow = await Follow.create({
            user:newUser.id,
            UserOrHotel:'Hotel'
            })

            newUser.follow = follow;
            newUser.avatar = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
            
            newUser.collage.push("")
            newUser.collage.push("")
            newUser.collage.push("")
            newUser.collage.push("")

            newUser.save(function (err) {
            if (err) { return cb(err); }
            return cb(null, newUser);
          });
        } else {
            // console.log(user);
          return cb(null, user);
        }
      });
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