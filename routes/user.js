const router = require("express").Router();

router.get("/usertest", (req,res)=>{
    res.send("rrr");
});

module.exports=router;