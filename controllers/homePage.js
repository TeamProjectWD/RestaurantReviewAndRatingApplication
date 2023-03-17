const Post = require('../model/postModel');

const Hotel = require('../model/hotelModel');

module.exports.HomePage = async function(req,res){
    var typeOfUser="Hotel";
    if (req.user && req.user.constructor.modelName === 'User') {
        typeOfUser = "User";
    }

    const postData = await Post.find({})
    .populate('user')
    .populate({
        path:'upVotes',
        populate:{
            path:'user'
        }
       
    })
    .populate({
        path:'comments',
        options: { sort: { createdAt: -1 } },
        populate:{
            path:'upVotes'
        },
    })
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).populate({
        path:'hotelName'
    }).populate({
        path:'menuModel'
    })


    const HotelData = await Hotel.find({}).populate();
 


    postData.reverse();

    // console.log(postData);

 

    return res.render('homePage',{
        
        title : "HR&R @ homePage",
        postData:postData,
        typeOfUser:typeOfUser,
        hotelNames: HotelData

    });

}


 