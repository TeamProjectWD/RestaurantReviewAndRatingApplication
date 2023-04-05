const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'UserOrHotel'
    },
    followers: [{ 
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'UserOrHotel' 
        }],
    followings: [{ 
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'UserOrHotel' 
    }],
    UserOrHotel:{
        type:String,
        required:true,
        enum:['User','Hotel']
    }
});

const Follow = mongoose.model('Follow',followSchema);

module.exports = Follow;

