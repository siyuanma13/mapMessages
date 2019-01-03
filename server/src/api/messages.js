const express = require('express');
const Joi = require('joi');

const db = require('../db');

//Mongo will grab the collection 
//with the name of messages
const messages = db.get('messages');

const schema = Joi.object().keys({
    name: Joi.string().min(1).max(100).required(),
    message: Joi.string().min(1).max(500).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});

const router = express.Router();

router.get('/', (req, res) => {
    messages.find()
        .then(allMessages => {
            res.json(allMessages);
        });
    });

router.post('/', (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        //add current time
        //insert into db,  
        const { name, message, latitude, longitude } = req.body;
        const userMessage = {
            name,
            message,
            latitude,
            longitude,
            date: new Date()
        };
        messages.insert(userMessage)
            .then(insertedMessage => {
                    res.json(insertedMessage);
                });

    } else {
        console.log(result.error);
        
    }
    
});

module.exports = router;
