const comment = require("../model/comment");

const post = require("../model/postModel");

module.exports.commentController = async function(req,res){
    
    console.log("reached");

    let commentData = await comment.create({
        user:req.user.id,
        content:req.body.content
    });

    let postData = await post.findById(req.params.pId);

    postData.comments.push(commentData.id);

    postData.save();

    console.log(req.params.pId);
    
    return res.redirect('back');
    
}
