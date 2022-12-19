
const console = require('console');
const Post = require('../model/postModel');


module.exports.PostConroller = async function(req,res){

    Post.uploadPicture(req,res,async function(err){

        if(err){
            console.error(err);
        }

        console.log("reqBody",req.body);

        let presentPost = await Post.create({
            content:req.body.content,
            avatar:Post.picPath + "/"+req.file.filename
        });

        console.log(req.file);

        console.log("**************************",presentPost);

        if(req.file){
            presentPost.avatar  = post.picPath + '/' + req.file.filename;
        }

        console.log("**************************",presentPost);

    })

    console.log("here");
 
    return res.redirect('back');
}