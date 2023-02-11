const Post = require('../model/postModel');

module.exports.HomePage = async function(req,res){

    const postData = await Post.find({})
    .populate('user')
    .populate({
        path:'upVotes',
       
    })
    .populate({
        path:'comments',
        options: { sort: { createdAt: -1 } },
        populate:{
            path:'user'
        }
    });

    postData.reverse();

    return res.render('homePage',{
        
        title : "HR&R @ homePage",
        postData:postData
    });

}


 