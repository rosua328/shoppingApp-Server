const router = require("express").Router();
const User = require("../models/User");
const {verifyToken, Authorization, AdminAuthorization} = require("./verifyToken");

// 유저 업데이트
router.put("/:id", Authorization, async(req,res)=>{
if(req.body.password){ // 비번을 변경할 경우
    req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
}
try{
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true})
    res.status(200).json(updateUser);
}catch(err){
    res.status(500).json(err);
}
})

// 유저 삭제
router.delete("/:id", Authorization, async(req,res)=>{
    try{
await User.findByIdAndDelete(req.params.id);
res.status(200).json("유저 정보 삭제 완료");
    }catch(err){
        res.status(500).json(err);
    }
})

// 유저 정보 받기
router.get("/find/:id", AdminAuthorization, async(req,res)=>{
    try{
const user = await User.findById(req.params.id);
const {password, ...others} = user._doc;
res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

// 모든 유저정보 받기
router.get("/", AdminAuthorization, async(req,res)=>{
    const query = req.query.new;
    try{

const users = query? await User.find().sort({_id:-1}).limit(2) : await User.find();
// const {password, ...others} = user._doc;
res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;