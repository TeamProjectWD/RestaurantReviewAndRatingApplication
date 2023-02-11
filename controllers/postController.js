
const console = require('console');
const Post = require('../model/postModel');
const User = require('../model/User');
const upVote = require('../model/upVote');


module.exports.PostConroller = function(req,res){

    

    Post.uploadPicture(req,res,async function(err){

        if(err){
            console.error(err);
        }
          
        const post_User = await User.findById(req.user._id);
        
        let presentPost = await Post.create({
            user:req.user._id,
            content:req.body.content,
            picturePath:Post.picPath + "/"+req.file.filename,
            upVotesCount:0
        });


        let upvote = await upVote.create({
            votable:presentPost.id,
            postORcomment:"Post",
            user : req.user.id,
            upVoted:false
        });

        presentPost.upVotes.push(upvote.id);

        presentPost.save(); 

        post_User.posts.push(presentPost.id);

        post_User.save();
 
    });

  
 
    return res.redirect('back');
}