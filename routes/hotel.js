const express = require('express');

const passport = require('passport');

const router = express.Router();

const hotelController = require('../controllers/hotelController');

const menuController = require('../controllers/menuController');

const reviewController = require('../controllers/reviewController');

const ratingController = require('../controllers/ratingController');

router.get('/signIn',hotelController.signIn);

router.get('/signUp',hotelController.signUp);

router.post('/create',hotelController.create);

router.post('/create-session',passport.authenticate(
    
    'local-hotel',
    {failureRedirect: '/hotel/signIn'}

),hotelController.createSession);


router.get('/signOut',hotelController.destroySession);

router.get('/profile/:uID/:vID',passport.checkAuthentication,hotelController.userProfile);

router.post('/profile/update/:id',hotelController.editProfile);

router.post('/addMenu/:id',menuController.addMenu);

router.post('/addReview/:id',reviewController.addReview);

router.post('/addRating/:id',ratingController.addRating);

router.post('/showMenu',menuController.getMenu);


module.exports = router;
