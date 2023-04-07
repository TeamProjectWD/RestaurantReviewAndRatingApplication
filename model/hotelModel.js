const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const profilePicturePath = path.join('/uploads/hotelProfile');

const collagePicturePath = path.join('/uploads/hotelProfile/collage');

const coverPicPath = path.join('/uploads/hotelProfile/imagesForBack');



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
    caption:{
        type:String,
    },
    collage: {
        type:Array,
        maxlength:4
    },
    avatar:{
        type:String,
    },
    coverPic:{
        type:String,
        default:""
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

const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
      cb(null, path.join(__dirname,'..',collagePicturePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
      cb(null, path.join(__dirname,'..',coverPicPath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});




hotelSchema.statics.uploadPicture =  multer({storage:storage}).single('avatar');

hotelSchema.statics.uploadCollagePicture =  multer({storage:storage1}).single('collage');

hotelSchema.statics.coverPic =  multer({storage:storage2}).single('cover');


hotelSchema.statics.picPath = profilePicturePath;

const Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = Hotel;