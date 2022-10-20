const express = require('express');

const { Module } = require('module');

const router = express.Router();




const HomePageController = require('../controllers/homePage');


router.get('/',HomePageController.HomePage);

module.exports = router;