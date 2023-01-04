const mongoose = require('mongoose');

const path = require('path');

const userSchemma = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }


});

const User = mongoose.model('User',userSchemma);

module.exports = User;