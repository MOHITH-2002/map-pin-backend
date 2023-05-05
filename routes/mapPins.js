const router = require('express').Router();

const Pin = require("../models/mapPins.js");///importing from db mapPin schema

/// creating map pins

router.post("/",async (req,res)=>{
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (error) {
        res.status(500).json(error)
    }

})


/// getting map pins

router.get("/",async (req,res)=>{
    try {
        const pins = await Pin.find();/// getting all pins
        res.status(200).json(pins);

    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router;
