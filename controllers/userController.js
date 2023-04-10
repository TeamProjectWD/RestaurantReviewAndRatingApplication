const User = require('../model/User');  
const fs = require('fs');
const path = require('path');
const Hotel = require('../model/hotelModel');
const Follow = require('../model/follow');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    return res.render("userSignUp",{
        title: "RRR"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    } 

    return res.render("userSignIn",{
        title: "RRR "
    })
}
 
module.exports.create = async function(req,res){

   
    if(req.body.password != req.body.confirm_password){
        
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email});
    if(!user){
       
        newUser = await User.create(req.body);
        let follow = await Follow.create({
            user:newUser.id,
            UserOrHotel:'User'
        })

        newUser.follow = follow;
        newUser.avatar = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
        newUser.save();

        return res.redirect('/user/signIn');
    }else{
        // console.log("here3");
        return res.redirect('back');
    }
    

}


//for creating session and signIN
module.exports.createSession = function(req,res){
    
    return res.redirect('/');
}
 
//for deleting session cookie created by passport
module.exports.destroySession = async function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    

}

module.exports.userProfile = async function(req,res){   
    
    const userToVisit = req.params.uID;
    const userId = req.user._id.toString();

    console.log(userToVisit,userId);
    
    const profileUSerData = await User.findById(req.params.uID)
    .populate({
        path:'posts',
        populate:{
            path:'user'
        }
    }).populate({
        path:'posts',
        populate:{
            path:'upVotes',
            populate:{
                path:'user'
            }
        }
    }) 
    .populate({
        path:'posts',
        populate:{
            path:'comments',
            populate:{
                path:'user'
            },
            populate:{
                path:'upVotes'
            }

        }
    })
    .populate({
        path:'follow',
        populate:{
            path:'followers'
        }
    });

    profileUSerData.posts.reverse();
    
    
    var followbtn = true;
    const follow = await Follow.findById(profileUSerData.follow);
     
    for(var i=0 ; i<follow.followers.length;i++){
        
        if(follow.followers[i].toString() == userId){
            followbtn =false;
            break;
        }
    }


    return res.render('userProfile',{
        
        title:"RRR",
        UserProfile :profileUSerData,
        userToVisit:userToVisit,
        userId:userId,
        typeOfUser:"User",
        followbtn:followbtn,
        followers:follow.followers.length,
        following:follow.followings.length

    });


}

module.exports.editProfile =async(req,res)=>{

    User.uploadPicture(req,res,async function(err){

        if(err){
            console.log(err);
        }
        const user = await User.findById(req.user.id);
        console.log(user);
        const nonEmptyValues = JSON.parse(JSON.stringify(req.body));
        const nonEmptyObject = {};

        console.log("values",nonEmptyValues,req.file);
        if(req.user.id == req.params.id){

            for(let userData in nonEmptyValues){
                if(nonEmptyValues[userData]!=""){
                    nonEmptyObject[userData] = nonEmptyValues[userData];
                }
            }
            if(req.file){
                // removing previous file from folder
                // if(user.avatar){
                //     const oldProfilePath = path.join(__dirname,'../uploads/userProfile/pics',user.avatar);
                //     fs.unlinkSync(oldProfilePath);
                // }
                nonEmptyObject.avatar = User.picPath+'/'+req.file.filename;
                
                // console.log(user);
            }
            
            await User.findByIdAndUpdate(req.user.id,{$set:nonEmptyObject});
            const users = await User.findById(req.user.id);
            user.save();

        }
        
    });
   
    return res.redirect('back');
}

module.exports.FollowOrUnfollow = async(req,res)=>{

    const followedById = req.user.id;
    const toFollowId = req.params.id;

    if(followedById!=toFollowId){
        
            // checking user logged in is user or hotel
            var typeOfUser="Hotel";
            if (req.user && req.user.constructor.modelName === 'User') {
                typeOfUser = "User";
            }
            if(typeOfUser=="User"){
                var followedBy = await User.findById(followedById);
            }
            else{
                var followedBy = await Hotel.findById(followedById);
            }
        
        
            const toFollow = await User.findById(toFollowId);
            
            const FollowVisitor = await Follow.findById(followedBy.follow);
            const FollowVisitPage = await Follow.findById(toFollow.follow);
            // console.log("222222222222222222222",FollowVisitPage);
        
            // logic 
        
            if(!FollowVisitPage.followers.includes(followedById)){
                FollowVisitPage.followers.push(followedById);
                FollowVisitor.followings.push(toFollowId);
        
                var followBtn = "unfollow"
        
        
            }
            else{
                FollowVisitPage.followers.pull(followedById);
                FollowVisitor.followings.pull(toFollowId);
        
        
                var followBtn = "follow"
        
            }
        
            await FollowVisitPage.save();
            await FollowVisitor.save();
        
 
            const FollowVisitPage1 = await Follow.findById(toFollow.follow);
    
        
            res.status(200).json(
            {msg:"succeess",followers:FollowVisitPage1.followers.length,following:FollowVisitPage1.followings.length,followBtn:followBtn}
            );
    }

}

module.exports.coverPic =async(req,res)=>{
    Hotel.coverPic(req,res,async function(err){
      if(err){
          console.log(err);
      }
  
      const user = await User.findById(req.user.id);
  
      if(req.file){
          if(user.coverPic){
              const oldProfilePath = path.join(__dirname,'../uploads/userProfile/backG',user.background);
              fs.unlinkSync(oldProfilePath);
          }
      }
  
      user.background = req.file.filename;
      await user.save();
      return res.redirect('back');
    })
  }
  
  module.exports.removeCoverPic = async(req,res)=>{
      const user =await User.findById(req.user.id);
      
      if(user.background){
          const oldProfilePath = path.join(__dirname,'../uploads/userProfile/backG',user.background);
          fs.unlinkSync(oldProfilePath);
      }
       user.background = "";
       await user.save();
      return res.redirect('back');
       
  
  }

