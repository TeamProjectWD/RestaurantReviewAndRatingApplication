 
const { findById } = require('../model/User');
const User = require('../model/User');  
const fs = require('fs');
const path = require('path');

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    
    return res.render("userSignUp",{
        title: "HR&R @ signUP"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    } 

    return res.render("userSignIn",{
        title: "HR&R @ signIN "
    })
}
//for sign up
module.exports.create = async function(req,res){

    // console.log("here",req.body.Password,req.body.confirm_password);
    // console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        // console.log("here1");
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email});
    if(!user){
        // console.log("here2");
        // console.log(req.body);
        newUser = await User.create(req.body);
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
    const profileUSerData = await User.findById(req.params.uID)
    .populate({
        path:'posts',
        populate:{
            path:'user'
        }
    }).populate({
        path:'posts',
        populate:{
            path:'upVotes'
        }
    }) 
    .populate({
        path:'posts',
        populate:{
            path:'comments'
        }
    });
    profileUSerData.posts.reverse();
    console.log(profileUSerData.avatar);
    console.log(userId,userToVisit);
    return res.render('userProfile',{
        
        title:"HR&R @ UserProfile",

        UserProfile :profileUSerData,
        userToVisit:userToVisit,
        userId:userId

    });


}

module.exports.editProfile =async(req,res)=>{
    console.log(req.file,__dirname);
    const userId = req.user._id.toString();
    if(userId==req.params.id){
        console.log(req.body);
        console.log(userId,req.params.id);

        const newObj = JSON.parse(JSON.stringify(req.body));
        console.log("newObj",newObj);
        const newObj2 ={};
        for(var key in newObj){
            if(newObj[key]!=""){
                newObj2[key] = newObj[key];
            }
        }
        if(req.file){
            // removing previous file from folder
            const user2 = await User.findById(userId);
            if(user2.avatar){
                // const pat = path.join(__dirname,"..\\uploads\\userProfile\\pics\\",user2.avatar)
                const path1 = path.join(__dirname,'../uploads/userProfile/pics',user2.avatar);
                fs.unlinkSync(path1);

            }


            // console.log("yesssssss");
            newObj2.avatar=req.file.filename;
        }
        const user1 = await User.findByIdAndUpdate(userId,{$set:newObj2});
        return res.redirect(`/user/profile/${userId}`);
    }
    return res.json('error');
}