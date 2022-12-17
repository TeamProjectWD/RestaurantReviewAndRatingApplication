const express = require('express');

const { Module } = require('module');

const router = express.Router();

const postController = require('../controllers/postController');



router.post('/',postController.PostConroller);



module.exports = router;