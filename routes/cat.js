const schemacategories=require('../models/categories.js')

const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();




router.post('/CreateCategorie', async (req, res) => {
   var CategoriesTest=await schemacategories.findOne({refCat:req.body.refCat})
   if(!CategoriesTest){
   var categories = await  schemacategories.create(req.body);
   res.send(categories)
   }
   else
   {
      res.send({message:"error"}
      )
   }

})
router.delete('/DeleteCategorie/:id', async (req, res) => {
   var CategoriesTest=await schemacategories.findOne({_id:req.params.id})
   
   if(CategoriesTest){
  await  schemacategories.deleteOne({_id:req.params.id});
   //oumur secuirité
   var categories = await  schemacategories.find();
     res.send({message:true,Cat:categories})
               }
         else{
     res.send({message:false})
             } 


 })
 router.put('/Updatecategories',async(req,res) =>{
    await schemacategories.findByIdAndUpdate(req.params.id, req.body, 
      {
       new: true 
      
      })
      var categories = await  schemacategories.find();
   
 
  res.send(categories)

 })
router.get('/GetAllCategorie', async (req, res) => {
   var categories = await  schemacategories.find().populate('ProduitCat');
   console.log(categories);
   res.send(categories)

})
router.get('/:id' , async (req, res) => {
   var categories= await schemacategories.findById(req.params.id).populate("ProduitCat")
   res.send(categories)
})

module.exports = router;