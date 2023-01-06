const upVote = require("../model/upVote");

const Post = require("../model/postModel");

const Comment = require("../model/comment");

module.exports.upVoteController = async function(req,res){

     

    let postORcom;

    if(req.query.type == 'Post'){
        console.log("here1");

        postORcom = await Post.findById(req.params.id);
         
    }else{
        console.log("here2");

        postORcom = await Comment.findById(req.params.id);
    }


    let upvoteInfo = await upVote.findOne({
        votable: req.params.id,
        postORcomment : req.query.type,
        user : req.user.id
    });

  

    if(upvoteInfo != null){

        await postORcom.upVotes.pull(upvoteInfo.id);
        await postORcom.save();
        await upvoteInfo.remove();
        console.log("done1");

    }else{
        let newUpvote = await upVote.create({
            votable: req.params.id,
            postORcomment : req.query.type,
            user : req.user.id
        });

        await postORcom.upVotes.push(newUpvote.id);
        await postORcom.save();
        console.log("done2");

    }


    return res.redirect('back');
     
    

}