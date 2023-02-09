const comment = require("../model/comment");

const post = require("../model/postModel");

module.exports.commentController = async function(req,res){

    console.log(req.body);

    let commentData = await comment.create({
        user:req.user.id,
        content:req.body.content
    });

    let postData = await post.findById(req.body.post_id);

    postData.comments.push(commentData.id);

    postData.save();
   

    if(req.xhr){

        console.log("XHR*******",req.body);
        
        return res.status(200).json({
            data:{
                comment:commentData,
                userName : req.user.name
            },
            postData:postData,
            
        })

    }
    
    console.log("reached");

     
    
    return res.redirect('back');
    
}
