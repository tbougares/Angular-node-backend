const express = require('express')

const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token,"token");
        console.log(req.headers,"header");
        
        if (!token) {
            throw (new Error('token not valid'))
        }
        else {
            const decodedToken =  await jwt.verify(token,"privateKey")
            console.log(decodedToken._id);
            if (!decodedToken) {
                throw (new Error('Unauthorized'))
                }
            
            
        
            if(decodedToken._id == "taher2023")
            {
                console.log('accepte')
                next();
                

            }
        }
        // next()
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = authMiddleware