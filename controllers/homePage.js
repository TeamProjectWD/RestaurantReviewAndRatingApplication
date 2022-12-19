const Post = require('../model/postModel');

module.exports.HomePage = async function(req,res){

    const postData = await Post.find({});

    console.log(postData);


    return res.render('homePage.ejs',{
        
        postData:postData
    });

}