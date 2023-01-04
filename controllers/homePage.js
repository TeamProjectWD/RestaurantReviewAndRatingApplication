const Post = require('../model/postModel');

module.exports.HomePage = async function(req,res){

    const postData = await Post.find({});

 


    return res.render('homePage',{
        
        title : "HR&R @ homePage",
        postData:postData
    });

}