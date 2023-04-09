const express = require('express');

 

const router = express.Router();

const passport = require('../config/passport');

const upVoteController = require('../controllers/upVoteController');

const HomePageController = require('../controllers/homePage');


router.get('/',passport.checkAuthentication,HomePageController.HomePage);

router.get('/auth/user/google' , passport.authenticate('userGoogle',{scope : ['email' , 'profile']}));

router.get('/auth/hotel/google' , passport.authenticate('hotelGoogle',{scope : ['email' , 'profile']}));

router.use('/posts',require('./posts'));

router.use('/user',require('./user'));

router.use('/hotel',require('./hotel'));

router.use('/search',require('./search'));


router.post('/upVote/:id',upVoteController.upVoteController);

module.exports = router;