const Hotel = require('../model/hotelModel');  
const fs = require('fs');
const path = require('path');
const Menu = require('../model/menuModel');
const User = require('../model/User');
const Post = require('../model/postModel');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        const user = req.user.id
        return res.redirect(`/profile/${user}`);
    }
    
    return res.render("hotelSignUp",{
        title: "HR&R @ signUP"
    })
}

module.exports.signIn = function(req,res){

    console.log("Yes+++++++++++++++++++++++++++++++++++++++++++++");

    if(req.isAuthenticated()){
        const user = req.user.id
        return res.redirect(`/`);
    } 

    return res.render("hotelSignIn",{
        title: "HR&R @ signIN "
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
        
        return res.redirect('/hotel/signIn');
    }else{
       
        return res.redirect('back');
    }
    

}


//for creating session and signIN
module.exports.createSession = function(req,res){
  
    const id = req.user.id;
    
    return res.redirect(`/hotel/profile/${id}/${id}`);
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

    console.log("acessed ***********************");
    
    const userToVisit = req.params.uID;
 
    let visitor = await User.findById(req.params.vID);

    let model;
 

    if(visitor){
        model = "User"
    }else{
        model = "Hotel"
    }

    console.log(req.params.uID);

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


    console.log("MODEL DATA",model);

    return res.render('hotel',{
        
        title:"HR&R @ HotelProfile",
        HotelProfile :profileUSerData,
        userToVisit:userToVisit,
        userId:userId,
        typeOfUser:model
    
    });


}

module.exports.editProfile =async(req,res)=>{

    User.uploadPicture(req,res,async function(err){

        if(err){
            console.log(err);
        }
        const user = await User.findById(req.user.id);
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
                if(user.avatar){
                    const oldProfilePath = path.join(__dirname,'../uploads/hotelProfile/pics',user.avatar);
                    fs.unlinkSync(oldProfilePath);
                }
                nonEmptyObject.avatar = req.file.filename;
                console.log(user);
            }
            
            await User.findByIdAndUpdate(req.user.id,{$set:nonEmptyObject});

        }
        
    });
   
    return res.redirect('back');
}


 