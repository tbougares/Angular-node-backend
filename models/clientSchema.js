const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  clientSchema  = new mongoose.Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    teleClient:String,
    sex:String,
    imageClient:String,
    liste_de_Command:[{type: Schema.Types.ObjectId, ref:'commande'}],
    
  });
module.exports=mongoose.model('client',clientSchema);