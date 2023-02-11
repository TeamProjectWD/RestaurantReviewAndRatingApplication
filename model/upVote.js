const mongoose = require('mongoose');

const  upVoteSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    votable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'postORcomment'
    },
    upVoted:{
        type:Boolean,
        required:true,
    },
    postORcomment:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
     

});


const upVote = mongoose.model('UpVote',upVoteSchema);

module.exports = upVote;