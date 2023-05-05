const router = require("express").Router();
const bcrypt = require('bcrypt');  /// there are two bcrypt is there we use only bcrypt not bcrypt.js
const User = require("../models/users.js");

/// register

router.post("/register", async (req, res) => {
    try {
        /// hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        // creating the new user

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        //// saving the user
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);


    } catch (error) {
        res.status(500).json(error);
    }
})

//login

router.post("/login", async (req, res) => {
    try {
     // find user
     const user = await User.findOne({username: req.body.username});
     if(!user)
     
        res.status(404).json("wrong username or password");
     
     
     /// validate password
else{
     const validPassword = await bcrypt.compare(req.body.password,user.password);
     if(!validPassword )
        res.status(404).json("wrong username or password");
    
     /// send credintials
else{
     res.status(200).json({_id: user.id,username:user.username});}
}
        
    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports = router;



