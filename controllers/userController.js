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

    return res.render('userProfile',{
        
        title:"HR&R @ UserProfile",

        UserProfile :profileUSerData,
        userToVisit:userToVisit,
        userId:userId

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
                    const oldProfilePath = path.join(__dirname,'../uploads/userProfile/pics',user.avatar);
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