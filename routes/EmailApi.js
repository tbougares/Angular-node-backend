const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/send-mail/',async  (req, res) => {
    console.log('hhhhh');
    //var code =req.body.code;

    // email message options
    const mailOptions = {
        from:"bougarest9428855@gmail.com",
        // to:req.body.email,
        to:"ha9.0bib90@gmail.com",
        subject: 'esim scociete',
        text:" Votre code est 123"
        
    };
    // email transport configuration

    var transport = nodemailer.createTransport({
        service:"gmail",

        auth: {
            user: "bougarest9428855@gmail.com",
            pass :"qlnkcyntyzuuqpur"
        }
    });
    // send email
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send({message: false});
        } else {
            console.log('Email sent: ' + info.reponse);
            res.send({message: true});
        }
    });
});

module.exports = router;