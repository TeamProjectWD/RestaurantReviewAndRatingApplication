
const console = require('console');
const Post = require('../model/postModel');
const User = require('../model/User');
const upVote = require('../model/upVote');
const Hotel = require('../model/hotelModel');


module.exports.PostConroller = function(req,res){

    Post.uploadPicture(req,res,async function(err){

        if(err){
            console.error(err);
        }
        const user_type = req.query.type;

        let presentPost = await Post.create({
            user:req.user._id,
            content:req.body.content,
            picturePath:Post.picPath + "/"+req.file.filename,
            upVotesCount:req.body.upVotesCount,
            UserOrHotel:req.body.userType
        });

        if(user_type=="User"){
            var post_User = await User.findById(req.user._id);
            presentPost.hotelName = req.body.hotel;
            presentPost.menuModel = req.body.menuItem;
            
            const hotel = await Hotel.findById(req.body.hotel);

            hotel.reviewPosts.push(presentPost.id);

            hotel.save();

        }
        else{
            var post_User = await Hotel.findById(req.user._id);
        }
        

        let upvote = await upVote.create({
            votable:presentPost.id,
            postORcomment:"Post",
            user : req.user.id,
            upVoted:false,
            UserOrHotel:req.body.userType
        });

        presentPost.upVotes.push(upvote.id);

        presentPost.save(); 

        post_User.posts.push(presentPost.id);

        post_User.save();
 
    });

  
    
    return res.redirect('back');
}