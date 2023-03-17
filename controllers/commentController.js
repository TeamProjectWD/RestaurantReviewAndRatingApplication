const comment = require("../model/comment");

const post = require("../model/postModel");

const upVote = require("../model/upVote");

module.exports.commentController = async function(req,res){

    const user_type = req.query.type;
    if(user_type=="User"){
        var UserOrHotel = "User"
    }
    else{
        var UserOrHotel = "Hotel"
        
    }

    let commentData = await comment.create({
        user:req.user.id,
        content:req.body.content,
        upVotesCount:0,
        UserOrHotel:UserOrHotel
    });

    let upvote = await upVote.create({
        votable: commentData.id,
        postORcomment:"Comment",
        user : req.user.id,
        upVoted:false,
        UserOrHotel:UserOrHotel

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

module.exports.deleteComment = async function(req,res){

    console.log("hello",req.body.cID,req.body.pID);


    if(req.xhr){

        let commentData = await comment.findById(req.body.cID);

        if(!commentData){

            return res.status(401).json({
                deleted:false
            })

        }

        let postData = await post.findById(req.body.pID);
    
        let commentUpvotes = commentData.upVotes;
    
        commentUpvotes.map(async data => {
     
            await upVote.findByIdAndDelete(data.toString());
    
        });
    
        postData.comments.pull(commentData.id);
    
        await postData.save();
    
        await commentData.remove();
    
        return res.status(200).json({
            deleted:true
        })

    }

    

}
