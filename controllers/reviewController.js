// const Hotel = require('../model/hotelModel');  
// const fs = require('fs');
// const path = require('path');
// const Menu = require('../model/menuModel');
// const User = require('../model/User');


// module.exports.addReview = async(req,res)=>{
//     var user = await User.findById(req.user.id);
//     if(!user){
//         return res.json("you can add review if you are a valid user , hotels cannot review");
//     }
//     const hotelId = req.params.id;
//     console.log(user);
//     try {
        
//         // var hotel = await Hotel.findById(hotelId);
    
//         // getting review
//         const review = req.body.review;
        
//         hotel.reviews.push({review:review,postedBy:user});
//         hotel.save();
//         return res.redirect('back');


//     } catch (error) {
//         return res.json(error);       
//     }

// }