let express=require("express")
const ProductModel  = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler=require("../utils/errorhadler")
const productRouter= express.Router()
const UserModel = require("../model/userModel")
const mongoose = require("mongoose");
const {productUpload}=require("../middleware/multer")
let path=require("path")


productRouter.post("/createProduct",productUpload.array("images",10), catchAsyncError(async(req, res, next)=>{
    const { email,name, description,category,tags,price,stock} = req.body;
    const images =req.files.map((file)=>file.path);
    console.log(email,name, description,category,tags,price,images);

    if (!email ||!name ||!description ||!category ||!tags ||!price ||!images ||!stock) {
        next(new Errorhadler("All fields are required",400))
    }
    let user=await UserModel.findOne({email})
    if(!user){
        next(new Errorhadler("user is not exist",404))
    }
    let product=new ProductModel({email,name, description,category,tags,price,images,stock})
  

    
    await product.save()
    res.status(201).json({message:"Product created successfully"})


}))

productRouter.get("/allproduct",catchAsyncError(async(req,res,next)=>{
    let allproduct=await ProductModel.find()

    if(allproduct && allproduct.length>0){
        allproduct=allproduct.map((product)=>{
        if(product.images && product.images.length>0){
            product.images=product.images.map((ele)=> path.basename(ele));
        }
          return product;
        })
        
    }

    res.status(200).json({status:true,message:allproduct})
    
}))




module.exports =productRouter;