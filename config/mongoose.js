const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newDB');

 
 

mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){

    console.log('connected to ::DB');

});

module.exports = db;
