const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  produitSchema  = new mongoose.Schema({
    
    nameProd:String,
    valeurProd:Number,
    stock:String,
    quantite:String,
    coleur:String,
    carcterstique:[],
    verifSousCat:Boolean,
    descProd:String,
    refProd:String,
    prixProd:Number,
    photoProd:String,
    sex:Boolean, 
    photoProd:String,
    promo:Number,
    type:String,
    photosProd:[],
    keywords:[],
    CategoriProd:{type: Schema.Types.ObjectId, ref:'categories'} //cle premair de categories



  });
module.exports=mongoose.model('produit',produitSchema);