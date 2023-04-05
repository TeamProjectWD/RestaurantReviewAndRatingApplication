const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const profilePicturePath = path.join('/uploads/hotelProfile');

const hotelSchema = new mongoose.Schema({
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
    }],
    menuArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu'
    }],
    reviewPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    follow:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Follow'
    }

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


hotelSchema.statics.uploadPicture =  multer({storage:storage}).single('avatar');

hotelSchema.statics.picPath = profilePicturePath;

const Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = Hotel;