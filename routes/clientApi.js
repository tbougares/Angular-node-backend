const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const schemaClient=require('../models/clientSchema.js');
const clientSchema = require('../models/clientSchema.js');
router.post('/Createclient', async (req, res) => {
   
   var ClientTest=await schemaClient.findOne({email:req.body.email})
   if(!ClientTest){
   var client = await  schemaClient.create(req.body);
   //5edmyt cryptage
   const saltRounds = 10;
   const salt = bcrypt.genSalt(saltRounds)
   
   client.password = await bcrypt.hash(client.password, saltRounds);
   client.save()
      //tok1en
      var token = jwt.sign({ _id: client._id }, 'privateKey', { expiresIn: '1d' })
      res.header('Authorization',token).send({message:true,token: token})
      //res.header f header tji 
      //res.send tji f body

   }
   else
   {
      res.send({message:false}
      )
   }
})
router.post('/Loginemail', async (req, res) => {
   try{
       var client = await clientSchema.findOne({email:req.body.email});

   if(client) { 
        var test = await   bcrypt.compare(req.body.password,client.password)
        console.log(test)
        if(test)
            {  
                  var token= jwt.sign({_id:client._id},'profKey', {expiresIn: '1d'})
                  // res.send({token: token})  pour envoyer comme objet  json 
                  res.header('Authorization',token).send({message:true , token:token ,id:client._id,name:client.name })
             }
             else
                  { return res.status(201).send({message:"mots de passe incorrect"})
                  /*return res.send({message:"incorrect"})*/}
  
        }
      else{
          return res.status(201).send({message:"email ou mots ded passe incorrect"})/*res.send({message:false})*/
            }
      
      }catch(error){
          res.send(error.message)   
      }
      
  });

module.exports = router;