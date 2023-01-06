const { reverse } = require('dns');
const Post = require('../model/postModel');

module.exports.HomePage = async function(req,res){

    const postData = await Post.find({})
    .populate('user')
    .populate('upVotes')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    var postData2 = postData.reverse();
    //  console.log(postData2);
    return res.render('homePage',{
        
        title : "HR&R @ homePage",
        postData:postData2
    });

}


 