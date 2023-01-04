const express = require('express');

 

const router = express.Router();

const passport = require('../config/passport');




const HomePageController = require('../controllers/homePage');


router.get('/',passport.checkAuthentication,HomePageController.HomePage);

router.use('/posts',require('./posts'));

router.use('/user',require('./user'));

module.exports = router;