
const User = require('../model/User');

const Hotel = require('../model/hotelModel');

module.exports.SearchController = async function(req,res){

    try{

        const data = req.body.name;

        let Users = await User.find({name:{$regex: new RegExp(`^${data}` ,"i")}}).exec();

        let Hotels = await Hotel.find({name:{$regex:new RegExp(`^${data}`,"i")}}).exec();

        return res.status(200).json({

            Users:Users,
            Hotels:Hotels

        });
    }
    catch(err)
    {
        console.log(err);
    }

     

     


}