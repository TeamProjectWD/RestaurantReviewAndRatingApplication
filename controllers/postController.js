const console = require('console');
const Post = require('../model/postModel');
const User = require('../model/User');
const upVote = require('../model/upVote');
const Hotel = require('../model/hotelModel');
const Comment = require('../model/comment');


module.exports.PostConroller = function(req,res){

    Post.uploadPicture(req,res,async function(err){

        if(err){
            console.error(err);
        }
        const user_type = req.query.type;

        var hotelName = "";
        var menuModel = "";

        if(user_type=="User"){
           hotelName = req.body.hotel;
           menuModel = req.body.menuItem;
        }
        let presentPost = await Post.create({
            user:req.user._id,
            content:req.body.content,
            picturePath:Post.picPath + "/"+req.file.filename,
            upVotesCount:req.body.upVotesCount,
            UserOrHotel:req.body.userType,
            hotelName : hotelName,
            menuModel : menuModel
        });

        let post_User;

        if(user_type=="User"){
            
            post_User = await User.findById(req.user._id);
            
            if(req.body.hotel){

                const hotel = await Hotel.findById(req.body.hotel);

                hotel.reviewPosts.push(presentPost.id);

                await hotel.save();

            }

            post_User.posts.push(presentPost.id);             

        }
        else{

            post_User = await Hotel.findById(req.user._id);

            post_User.posts.push(presentPost.id);
            
        }
        
        let upvote = await upVote.create({
            votable:presentPost.id,
            postORcomment:"Post",
            user : req.user.id,
            upVoted:false,
            UserOrHotel:req.body.userType
        });

        presentPost.upVotes.push(upvote.id);

        await presentPost.save();

        await post_User.save();

 
    });

     

    return res.redirect('/');
}

module.exports.deletePost = async function(req,res){

    console.log(req.params.uID,req.params.pID,req.query.type);

    let type = req.query.type;

    let PostUser;

    if(type == 'User'){
        
        PostUser = await User.findById(req.params.uID);

    }else{

        PostUser = await Hotel.findById(req.params.uID);

    }

    const post = await Post.findById(req.params.pID);

     

    let commentData = post.comments;
    
    if (commentData.length > 0){
        for (const comment of commentData){
            await upVote.deleteOne({likeable:comment._id});
            await Comment.deleteOne({id:comment.id});
        }
    }

    PostUser.posts.pull(req.params.pID);

    await upVote.deleteMany({postORcomment:req.params.pID});

    post.remove();

    PostUser.save();

    return res.redirect('back');
}