const express = require('express');

const { Module } = require('module');

const router = express.Router();




const HomePageController = require('../controllers/homePage');


router.get('/',HomePageController.HomePage);

router.use('/posts',require('./posts'));

module.exports = router;