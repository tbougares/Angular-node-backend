const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  clientSchema  = new mongoose.Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    sex:String,
    imageClient:String
    
  });
module.exports=mongoose.model('client',clientSchema);