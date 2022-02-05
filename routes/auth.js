const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try{
       const saveUser = await newUser.save();
       console.log(saveUser);
    }catch(err){
        console.log(err);
    }
});

module.exports=router;