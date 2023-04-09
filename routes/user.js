const express = require('express');

const passport = require('passport');

const { Module } = require('module');

const router = express.Router();

const userController = require('../controllers/userController');

const User = require('../model/User');

router.get('/signIn',userController.signIn);

router.get('/signUp',userController.signUp);

router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    
    'local-user',
    {failureRedirect: '/user/signIn'}

),userController.createSession);

router.get('/google/callback',
    passport.authenticate('userGoogle',{
        successRedirect:'/',
        failureRedirect:'/user/signIn'
    })
)

router.get('/signOut',userController.destroySession);


router.get('/profile/:uID/',passport.checkAuthentication,userController.userProfile);

router.post('/profile/update/:id',userController.editProfile);

router.get('/follow/:id',userController.FollowOrUnfollow);

module.exports = router;

