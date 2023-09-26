const express = require('express');
const schemaCat = require('../models/categories.js');
const router = express.Router();
const schemaProduit=require('../models/produit.js');
const midlewar =require('../midelwar/auth.js');

router.post('/Createproduit', midlewar , async (req, res ) => {
   // const token = req.headers.authorization.split(' ')[1];
   //      console.log(token,"token");
   //      console.log(req.headers,"header");
   var produitTest=await schemaProduit.findOne({refProd:req.body.refProd})
   if(!produitTest){
   var produit = await  schemaProduit.create(req.body);
   var prod = await produit.populate('CategoriProd')
   await schemaCat.findByIdAndUpdate({ _id:req.body.CategoriProd }, { $push: { ProduitCat: produit._id } }).then((categorie) => {
      console.log(categorie)
   //    userSchema.findOne({ _id: req.params.idUser }).populate('commandes').populate('grade').populate('userAj').then((user) => {
   //    console.log('push')
   //    res.send(user);
   // })
   });
   res.send(prod)
   }
   else
   {
      res.send({message:"error"}
      )
   }

})
router.delete('/DeleteProduit/:id', async (req, res) => {
   var produitTest=await schemaProduit.findOne({_id:req.params.id})
   
   if(produitTest){
  await  schemaProduit.deleteOne({_id:req.params.id});
   //oumur secuirité
   var produits = await  schemaProduit.find();
     res.send({message:true,prods:produits})
               }
         else{
       res.send({message:false})
             } 


 })
 router.put('/UpdateProduit/:id',async(req,res) =>{
    await schemaProduit.findByIdAndUpdate(req.params.id, req.body, 
      {
         new: true 
      
      })
      var produits = await  schemaProduit.find();
   

res.send(produits)

 })
router.get('/GetAllProduit', async (req, res) => {
   var produits = await  schemaProduit.find();
   res.send(produits)

})
//midzlwar nn f getall 5atyr client lazem ychoufouh
router.get('/:id' , async (req, res) => {
   var produit= await schemaProduit.findById(req.params.id)
   res.send(produit)
})


//router.get('/GetProduit', async (req, res) => {
 //  var produits = await  schemaProduit.find({nameProd:"parfum"}
  // );
   //res.send(produits)

//})
module.exports = router;
