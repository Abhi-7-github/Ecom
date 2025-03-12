let express=require("express")
const ProductModel  = require("../model/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler=require("../utils/errorhadler")
const productRouter= express.Router()
const UserModel = require("../model/userModel")
const mongoose = require("mongoose");
const {productUpload}=require("../middleware/multer")
let path=require("path")
const auth=require("../middleware/auth")


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

productRouter.delete("/delete/:id",catchAsyncError(async(req,res,next)=>{
    console.log("kjmk")
       let id=req.params.id
       if(!id){
         return next(new Errorhadler("id is not passed",400))
       }
       if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Errorhadler("Invalid ObjectId", 400));
       }
       const deletedProduct = await ProductModel.findByIdAndDelete(id);
       if (!deletedProduct) {
           return next(new Errorhadler("Product not found", 404));
       }
       res.status(200).json({status:true,message:"deleted successfully"})
       
 }))
 
 
 
 productRouter.put("/update/:id",productUpload.array("images",10),catchAsyncError(async(req,res,next)=>{
    
    let id=req.params.id
    if(!id){
      return next(new Errorhadler("id is not passed",400))
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
     return next(new Errorhadler("Invalid ObjectId", 400));
    }
    
    let { email,name, description,category,tags,price,stock,images} = req.body;
    const imagesArr =req.files.map((file)=>path.basename(file.path));
    console.log(images,imagesArr)
    if(!images){
        images=[]
    }
    else{
        images =Array.isArray(images)?images:[images]
    }
    console.log(images,imagesArr,"88")
    const updated =await ProductModel.findByIdAndUpdate(id,{ email,name, description,category,tags,price,stock,images:[...imagesArr,...images]},{new:true})
    res.status(200).json({status:true,message:"updated successfully",data:updated})
    
 }))


 productRouter.post("/cart",auth,catchAsyncError(async(req,res,next)=>{
    const { productId, quantity } = req.body;
    let userId = req.user_id;
  
    if (!userId) {
      return next(new Errorhadler("UserID is required", 400));
    }
  
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return next(new Errorhadler("Invalid productId", 400));
    }
  
    if (!quantity || quantity < 1) {
      return next(new Errorhadler("Quantity must be at least 1", 400));
    }
  
    const user = await UserModel.findById(userId);
    if (!user) {
      return next(new Errorhadler("User not found", 404));
    }
  
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(new Errorhadler("Product not found", 404));
    }
  
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
  
    if (cartItemIndex > -1) {
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save(); 

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: user.cart,
    });
}))






module.exports =productRouter;