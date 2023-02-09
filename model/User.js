const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const profilePicturePath = path.join('/uploads/userProfile/pics');

const userSchemma = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }]


});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
      cb(null, path.join(__dirname,'..',profilePicturePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});


userSchemma.statics.uploadPicture =  multer({storage:storage}).single('avatar');

userSchemma.statics.picPath = profilePicturePath;

const User = mongoose.model('User',userSchemma);

module.exports = User;