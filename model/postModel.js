const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const postPicturePath = path.join('/uploads/posts/pics');

const postSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type : String,
        required:true 
    },
    upVotes:[{

        type: mongoose.Schema.Types.ObjectId,
        ref:'UpVote'

    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    picturePath:{
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
      cb(null, file.fieldname + '-' + Date.now());
    }
});
  
 

postSchema.statics.uploadPicture =  multer({storage:storage}).single('picturePath');

postSchema.statics.picPath = postPicturePath;

const Post = mongoose.model('Post',postSchema);

module.exports = Post;