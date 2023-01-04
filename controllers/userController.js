 
const User = require('../model/User');  

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
 

module.exports.destroySession = async function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    

}