const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
const authHeader = req.headers.token;
if(authHeader){
    const token = authHeader.split(" ")[1];
jwt.verify(token, process.env.JWT_ACC_KEY, (err,user)=>{
    if(err) res.status(403).json("토큰이 일치하지 않아요!") ;
    req.user = user;
    next();
});
}else{
    res.status(401).json("해더에 토큰이 없어요")
}
}

// 어드민or유저 모두 사용
const Authorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("권한이 없습니다.")
        }
    })
}

// 어드민만 사용
const AdminAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("권한이 없습니다")
        }
    })
}


module.exports = {verifyToken, Authorization, AdminAuthorization};