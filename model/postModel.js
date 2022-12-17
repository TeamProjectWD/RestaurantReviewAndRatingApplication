const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const postPicturePath = path.join('/uploads/posts/pics');

const postSchema = new mongoose.Schema({

    content:{
        type : String,
        required:true 
    },

    avatharPath:{
        type:String,
        required:true
    },
    timestamps:{
        createdAt:'created_at'
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',postPicturePath));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
});
  
const upload = multer({ storage: storage });

postSchema.statics.uploadPicture =  multer({storage:storage}).single('postPicture');

postSchema.statics.picPath = postPicturePath;

const Post = mongoose.model('Post',postSchema);

module.exports = Post;