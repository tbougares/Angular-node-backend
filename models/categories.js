const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  categorieSchema  = new mongoose.Schema({
    
    refCat:String,
    nameCateg:String,
    ExisteCat:Boolean,
    ImgCat:String,
    ProduitCat:[{type: Schema.Types.ObjectId, ref:'produit'}],
  });
module.exports=mongoose.model('categories',categorieSchema);