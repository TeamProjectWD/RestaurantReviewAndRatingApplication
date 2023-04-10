const Hotel = require('../model/hotelModel');  
const fs = require('fs');
const path = require('path');
const Menu = require('../model/menuModel');
const User = require('../model/User');
const Post = require('../model/postModel');
const Follow = require('../model/follow');
const { log } = require('console');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        const user = req.user.id
        return res.redirect(`/profile/${user}`);
    }
    
    return res.render("hotelSignIn",{
        title: "RRR",
        layout:false
    })
}

module.exports.signIn = function(req,res){

    // console.log("Yes+++++++++++++++++++++++++++++++++++++++++++++");

    if(req.isAuthenticated()){
        const user = req.user.id
        return res.redirect(`/`);
    } 

    return res.render("hotelSignIn",{
        title: "RRR",
        layout : false
    })
}
//for sign up
module.exports.create = async function(req,res){

    
    if(req.body.password != req.body.confirm_password){
       
        return res.redirect('back');
    }
    let user = await Hotel.findOne({email:req.body.email});
    if(!user){
        
        newUser = await Hotel.create(req.body);

        let follow = await Follow.create({
            user:newUser.id,
            UserOrHotel:'Hotel'
        })

        newUser.follow = follow;
        newUser.avatar = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";
        
        newUser.collage.push("")
        newUser.collage.push("")
        newUser.collage.push("")
        newUser.collage.push("")

        
        await newUser.save();
        
        return res.redirect('/hotel/signIn');
    }else{
       
        return res.redirect('back');
    }
    

}


//for creating session and signIN
module.exports.createSession = function(req,res){
  
    const id = req.user.id;
    
    return res.redirect(`/hotel/profile/${id}`);
}
 
//for deleting session cookie created by passport
module.exports.destroySession = async function(req,res,next){
    console.log(req.user);
    req.logout(function(err) {
       
        if (err) { return next(err); }
        res.redirect('/');
    });
    

}

module.exports.userProfile = async function(req,res){  
    
    

    const userToVisit = req.params.uID;
    console.log(userToVisit);
 
    let visitor = await User.findById(req.user.id);

    let model;
 

    if(visitor){
        model = "User"
    }else{
        model = "Hotel"
    }

    const userId = req.user._id.toString();
    
    const profileUSerData = await Hotel.findById(req.params.uID)
    .populate({
        path:'menuArray',
        populate:{
            path:'rating'
        }
    }).populate({
        path:'reviewPosts',
        populate:{
            path:'user'
        }
    })
    .populate({
        path:'reviewPosts',
        populate:{
            path:'upVotes',
            populate:{
                path:'user'
            }
        }
    })
    .populate({
        path:'reviewPosts',
        populate:{
            path:'comments',
            options: { sort: { createdAt: -1 } },
            populate:{
                path:'upVotes'
            }
        }
    })
    .populate({
        path:'reviewPosts',
        populate:{
            path:'comments',
            populate:{
                path:'user'
            }
        }
    })
    .populate({
        path:'reviewPosts',
        populate:{
            path:'hotelName'
        }
    })
    .populate({
        path:'reviewPosts',
        populate:{
            path:'menuModel'
        }
    });

    var followbtn = true;
    const follow = await Follow.findById(profileUSerData.follow);
    // console.log("````````````````",follow);
    for(var i=0 ; i<follow.followers.length;i++){
        // console.log("`````````````````",follow.followers[i].toString());
        if(follow.followers[i].toString() == userId){
            followbtn =false;
            break;
        }
    }
    // console.log(profileUSerData.menuArray);

    return res.render('hotel',{
        
        title:"RRR",
        HotelProfile :profileUSerData,
        userToVisit:userToVisit,
        userId:userId,
        typeOfUser:model,
        followbtn:followbtn,
        followers:follow.followers.length,
        following:follow.followings.length,
        // layout:false,
    
    });


}

module.exports.editProfile =async(req,res)=>{

    Hotel.uploadPicture(req,res,async function(err){

        if(err){
            console.log(err);
        }
        const user = await Hotel.findById(req.user.id);
        const nonEmptyValues = JSON.parse(JSON.stringify(req.body));
        const nonEmptyObject = {};

        console.log("values",nonEmptyValues,req.file);
        // console.log("-----------------------------------",req.user.id,req.params.id);
        if(req.user.id == req.params.id){

            for(let userData in nonEmptyValues){
                if(nonEmptyValues[userData]!=""){
                    nonEmptyObject[userData] = nonEmptyValues[userData];
                }
            }
            if(req.file){
                // removing previous file from folder
                // if(user.avatar){
                //     const oldProfilePath = path.join(__dirname,'../uploads/hotelProfile',user.avatar);
                //     fs.unlinkSync(oldProfilePath);
                // }
                nonEmptyObject.avatar = Hotel.picPath+'/'+req.file.filename;
                console.log(user);
            }
            
            await Hotel.findByIdAndUpdate(req.user.id,{$set:nonEmptyObject});

        }
        
    });
   
    return res.redirect('back');
}


 
module.exports.FollowOrUnfollow = async(req,res)=>{

    const followedById = req.user.id;
    const toFollowId = req.params.id;
    if(followedById!=toFollowId){
        
     
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
        
        
            const toFollow = await Hotel.findById(toFollowId);
            
        
            const FollowVisitor = await Follow.findById(followedBy.follow);
            const FollowVisitPage = await Follow.findById(toFollow.follow);
             
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
        
            // for front end thing
            const FollowVisitPage1 = await Follow.findById(toFollow.follow);
            // console.log("22222222222222222222222",FollowVisitPage1);
        
            res.status(200).json(
            {msg:"succeess",followers:FollowVisitPage1.followers.length,following:FollowVisitPage1.followings.length,followBtn:followBtn}
            );
    }

}

module.exports.collage = async(req,res)=>{

    Hotel.uploadCollagePicture(req,res,async function(err){
        
        if(err){
            console.log(err);
        }
        
         
        const user = await Hotel.findById(req.user.id);
        

        // reference for thephoto
        const ref = req.body.Photo;

        // removing old photo
        if(user.collage[ref]!=""){
            const oldProfilePath = path.join(__dirname,'../uploads/hotelProfile/collage',user.collage[ref]);
            fs.unlinkSync(oldProfilePath);
        }

        console.log(req.file.filename);
         user.collage[ref] = req.file.filename;

         await user.save();

         
        
    });

    return res.redirect('back');

}


module.exports.coverPic =async(req,res)=>{
  Hotel.coverPic(req,res,async function(err){
    if(err){
        console.log(err);
    }

    const user = await Hotel.findById(req.user.id);

    if(req.file){
        if(user.coverPic){
            const oldProfilePath = path.join(__dirname,'../uploads/hotelProfile/imagesForBack',user.coverPic);
            fs.unlinkSync(oldProfilePath);
        }
    }

    user.coverPic = req.file.filename;
    await user.save();
    return res.redirect('back');
  })
}

module.exports.removeCoverPic = async(req,res)=>{
    const user =await Hotel.findById(req.user.id);
    console.log(user);
    if(user.coverPic){
        const oldProfilePath = path.join(__dirname,'../uploads/hotelProfile/imagesForBack',user.coverPic);
        fs.unlinkSync(oldProfilePath);
    }
     user.coverPic = "";
     await user.save();
    return res.redirect('back');
     

}