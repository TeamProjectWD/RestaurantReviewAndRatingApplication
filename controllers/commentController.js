const comment = require("../model/comment");

const post = require("../model/postModel");

const upVote = require("../model/upVote");

module.exports.commentController = async function(req,res){

     

    let commentData = await comment.create({
        user:req.user.id,
        content:req.body.content,
        upVotesCount:0
    });

    let upvote = await upVote.create({
        votable: commentData.id,
        postORcomment:"Comment",
        user : req.user.id,
        upVoted:false
    });

    let postData = await post.findById(req.body.post_id);

    await commentData.upVotes.push(upvote.id);

    await commentData.save();

    await postData.comments.push(commentData.id);

    await postData.save();

    if(req.xhr){
        
        return res.status(200).json({
            data:{
                comment:commentData,
                userName : req.user.name,
                commentID:commentData.id,
                commentUpVoteCount:commentData.upVotesCount
            }
            
        })

    }     
    
    return res.redirect('back');
    
}
