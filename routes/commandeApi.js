const express = require('express');
const schemaCat = require('../models/categories.js');
const schemaProduit=require('../models/produit.js');
const schemaCommande=require('../models/commande.js');

const schemaClient=require('../models/clientSchema.js');
const router = express.Router();
const nodemailer = require('nodemailer');
const { random } = require('lodash');



router.post('/Createcommande', async (req, res) => {
   

   
   if(req.body.Compte_Client === false)
   {var commande = await  schemaCommande.create(req.body);}
   else 
   {
      
      var commande = await  schemaCommande.create(req.body);
      var client = await  schemaClient.create({
         name:req.body.NomClient,
         lastName:req.body.PrenomClient,
         teleClient:req.body.TeleClient,
         email:req.body.EmailClient,


      });
      commande.Passer_Client=client._id;
      await commande.save()
      await schemaClient.findByIdAndUpdate({ _id: client._id}, { $push: { liste_de_Command: commande._id } }).then((commande) => {
      console.log(commande)
      });
      
   }


   
   res.send(commande)

}
)
router.delete('/Deletecommande/:id', async (req, res) => {
   var commandeTest=await schemacommande.findOne({_id:req.params.id})
   
   if(commandeTest){
  await  schemacommande.deleteOne({_id:req.params.id});
   //pour faire secuirité
   var commandes = await  schemacommande.find();
     res.send({message:true,prods:commandes})
               }
         else{
       res.send({message:false})
             } 


 })
 router.put('/Updatecommande/:id',async(req,res) =>{
    await schemacommande.findByIdAndUpdate(req.params.id, req.body, 
      {
         new: true 
      
      })
      var commandes = await  schemacommande.find();
   
 
  res.send(commandes)

 })
router.get('/GetAllcommande', async (req, res) => {
   var commandes = await  schemacommande.find();
   res.send(commandes)

})
router.get('/:id' , async (req, res) => {
   var commande= await schemacommande.findById(req.params.id)
   res.send(commande)
})

module.exports = router;