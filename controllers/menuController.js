const Hotel = require('../model/hotelModel');  
const fs = require('fs');
const path = require('path');
const Menu = require('../model/menuModel');
const User = require('../model/User');


module.exports.addMenu = (req,res)=>{

    Menu.uploadPicture(req,res,async function(err){

            if(err){
                console.log(err);
            }
        
            const HotelUser = await Hotel.findById(req.user._id);
          
            let menu = await Menu.create({
                hotel:req.user._id,
                content:req.body.content,
                name:req.body.name,
                picturePath:Menu.picPath + "/"+req.file.filename
            });

            HotelUser.menuArray.push(menu.id);
            HotelUser.save();
            return res.redirect('back');

    });

         
}


module.exports.getMenu = async function(req,res){

    console.log(req.body.hotelID);

    let hotelMenu = await Hotel.findById(req.body.hotelID)
    .populate('menuArray');


    console.log(hotelMenu.menuArray);

    return res.status(200).json({
        data:hotelMenu.menuArray
    })
    
}