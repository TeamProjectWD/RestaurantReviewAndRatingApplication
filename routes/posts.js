const express = require('express');

const { Module } = require('module');

const router = express.Router();

const postController = require('../controllers/postController');

 

const commentController = require('../controllers/commentController');



router.post('/',postController.PostConroller);

 

router.post('/comment/:pId',commentController.commentController);



module.exports = router;