
const console = require('console');
const { compile } = require('ejs');
const Post = require('../model/postModel');
const User = require('../model/User');


module.exports.PostConroller = function(req,res){

    console.log(req.user);



    Post.uploadPicture(req,res,async function(err){

<<<<<<< HEAD
        console.log(req.body.picturePath);
=======
        console.log(req.file);
>>>>>>> 6bdb3eb880fa6238ab23362eaa981f312df47dc2

        if(err){
            console.error(err);
        }
        
        const post_User = await User.findById(req.user._id);

        // console.log("postUser",post_User);

         

        console.log("reqBody",req.file.filename);

        let presentPost = await Post.create({
            user:req.user._id,
            content:req.body.content,
            picturePath:Post.picPath + "/"+req.file.filename
        });

        await post_User.posts.push(presentPost.id);

        await post_User.save();

        // console.log("afterrrrrrrrrrrrrr",post_User)

        // console.log(presentPost);

    });

    // console.log("here");
 
    return res.redirect('back');
}