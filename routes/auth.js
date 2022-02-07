const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// 회원가입
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC_KEY).toString()
      });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    });

    
// 로그인
router.post("/login", async(req, res)=>{
    try{
const user = await User.findOne({username : req.body.username});
!user && res.status(401).json("아이디 잘못입력!");
const hashPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC_KEY);
const Realpassword = hashPass.toString(CryptoJS.enc.Utf8);
Realpassword !==req.body.password && res.status(401).json("비번 잘못입력!");

// 다 일치할 시

const accessToken = jwt.sign(
    {id : user._id, isAdmin : user.isAdmin}, 
    process.env.JWT_ACC_KEY,
    {expiresIn : "1d"}    
    );

const {password, ...others} = user._doc;
res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;