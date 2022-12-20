const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const postPicturePath = path.join('/uploads/posts/pics');

const postSchema = new mongoose.Schema({

    content:{
        type : String,
        required:true 
    },

    avatar:{
        type:String,
    }
},{
    timestamps:true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
      cb(null, path.join(__dirname,'..',postPicturePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});
  
 

postSchema.statics.uploadPicture =  multer({storage:storage}).single('avatar');

postSchema.statics.picPath = postPicturePath;

const Post = mongoose.model('Post',postSchema);

module.exports = Post;