const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  commandeSchema  = new mongoose.Schema({
    
    NumCom:String,
    EtatCom:String,
    ValidationCom:Boolean,
    Date_Creation:String,
    Date_Validation:String,
    Totale:String,
    RemiseCommande:String,
    NomClient:String,
    PrenomClient:String,
    TeleClient:String,
    EmailClient:String,
    AdressClient:String,
    Livraison:String,
    Compte_Client:Boolean,
    liste_de_Produit:[{type: Schema.Types.ObjectId, ref:'produit'}],
    Passer_Client:{type: Schema.Types.ObjectId, ref:'client'},

});
module.exports=mongoose.model('commande',commandeSchema);