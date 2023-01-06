
const console = require('console');
const { compile } = require('ejs');
const Post = require('../model/postModel');
const User = require('../model/User');


module.exports.PostConroller = async function(req,res){

    console.log(req.user);



    Post.uploadPicture(req,res,async function(err){

        if(err){
            console.error(err);
        }
        
        const post_User = await User.findById(req.user._id);

        console.log("postUser",post_User);

         

        console.log("reqBody",req.body);

        let presentPost = await Post.create({
            user:req.user._id,
            content:req.body.content,
            picturePath:Post.picPath + "/"+req.file.filename
        });

        await post_User.posts.push(presentPost.id);

        await post_User.save();

        console.log("afterrrrrrrrrrrrrr",post_User)

        console.log(presentPost);

    });

    console.log("here");
 
    return res.redirect('back');
}