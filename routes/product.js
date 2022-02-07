const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, Authorization, AdminAuthorization} = require("./verifyToken");

// 상품 생성
router.post("/", AdminAuthorization, async(req,res)=>{
    const newProduct = new Product(req.body)
try{
const saveProduct = await newProduct.save();
res.status(201).json(saveProduct);
}catch(err){
    res.status(500).json(err);
}
})


// 상품 수정
router.put("/:id", AdminAuthorization, async(req,res)=>{

try{
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },{new:true})
    res.status(200).json(updateProduct);
}catch(err){
    res.status(500).json(err);
}
})

// 상품 삭제
router.delete("/:id", AdminAuthorization, async(req,res)=>{
    try{
await Product.findByIdAndDelete(req.params.id);
res.status(200).json("상품 삭제 완료");
    }catch(err){
        res.status(500).json(err);
    }
})

// 상품 정보 받기 
router.get("/find/:id", async(req,res)=>{ //모두가 볼 것이기에 jwt 검증을 하지 않는다
    try{
const product = await Product.findById(req.params.id);
res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

// 모든 상품 정보 받기
router.get("/", async(req,res)=>{
    const newOne = req.query.new;
    const category = req.query.category;
    try{
        let products;
        if(newOne){
            products =await Product.find().sort({_id:-1}).limit(2);
        }
        else if(category){
products = await Product.find({
    cate:{
        $in : [category]
    }
})
        }
        else{
            products = await Product.find();
        }
res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports=router;