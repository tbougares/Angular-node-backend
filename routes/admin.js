const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
var data="habib";


router.post('/LoginAdmin', async (req, res, next) => {


    // if (data == "habib"){
    //     next();
    // }
    
    if(req.body.login == "Admin" && req.body.password =='taher2023')
    {
        // // res.send({message : true});
        var token = jwt.sign({ _id: req.body.password}, 'privateKey', { expiresIn: '1d' })
        
        // var tokenData = await jwt.verify(token,"privateKey")
        // console.log(tokenData,"token data")
        res.send({message:true,token: token})

    }else
    {
        res.send({message : false});
    }
    
})

router.post('/LoginAdminToken', async (req, res, next) => {

    var tokenData = await jwt.verify(req.body.token,"privateKey")
    // console.log(tokenData,"data")
    
    if(tokenData._id == "taher2023")
    {
        res.send({message : true});

    }else
    {
        res.send({message : false});
    }
    
    // var ClientTest=await schemaClient.findOne({email:req.body.email})
    // if(!ClientTest){
    // var client = await  schemaClient.create(req.body);
    // //5edmyt cryptage
    // const saltRounds = 10;
    // const salt = bcrypt.genSalt(saltRounds)
    
    // client.password = await bcrypt.hash(client.password, saltRounds);
    // client.save()
    //    //tok1en
    //    var token = jwt.sign({ _id: client._id }, 'privateKey', { expiresIn: '1d' })
    //    res.header('Authorization',token).send({message:true,token: token})
    //    //res.header f header tji 
    //    //res.send tji f body
 
    // }
    // else
    // {
    //    res.send({message:false}
    //    )
    // }
 })
 
module.exports = router;