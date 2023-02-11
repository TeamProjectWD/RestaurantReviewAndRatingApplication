const upVote = require("../model/upVote");

const Post = require("../model/postModel");

const Comment = require("../model/comment");
 

module.exports.upVoteController = async function(req,res){

     

    let postORcom;

    if(req.query.type == 'Post'){
      

        postORcom = await Post.findById(req.params.id);
         
    }else{
        

        postORcom = await Comment.findById(req.params.id);
    }

   

    let upvoteInfo = await upVote.findOne({
        votable: req.params.id,
        user : req.user.id,
    });

    if(upvoteInfo == null){
        let newUpVote = await upVote.create({
            votable: req.params.id,
            postORcomment : req.query.type,
            user : req.user.id,
            upVoted:false,
        })

        postORcom.upVotes.push(newUpVote.id);
 
        upvoteInfo = newUpVote;
    }



    if(upvoteInfo.upVoted == true){
        upvoteInfo.upVoted = false;
        postORcom.upVotesCount--;
    }else{
        upvoteInfo.upVoted = true;
        postORcom.upVotesCount++;
    }

    upvoteInfo.save();

    postORcom.save();

    if(req.xhr){
        return res.status(200).json({
            data:{
                upVote : upvoteInfo,
                count:postORcom.upVotesCount
            }
        })
    }


    return res.redirect('back');
     
    

}