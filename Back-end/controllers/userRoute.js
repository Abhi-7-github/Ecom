let express=require("express")
const UserModel = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler=require("../utils/errorhadler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { sendMail } =require("../utils/mail")
let userRoute= express.Router()
const {upload}=require("../middleware/multer")


  





  userRoute.post("/signup",catchAsyncError( async (req, res, next) => {
       console.log(req.body)

   
      const {name, email, password } = req.body;
  
      if (!email || !password ||!name) {
        next(new Errorhadler("name,email and password required",400))
      } 
      let user=await UserModel.findOne({email:email})
      if(user){
        next(new Errorhadler("user is already exist..........",400))
      }

      

      bcrypt.hash(password,5,async(err,hash)=>{

          if(err){
            next(new Errorhadler("server error",500))
          }
          let newUser=new UserModel({name,email,password:hash})
          


          let token =jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:60*60*60*60860})
          let PORT=process.env.PORT
          let activation_url=`http://localhost:${PORT}/user/activation/${token}`
          try {
            await sendMail(
              {
                email:newUser.email,
                subject:"Activate your account",
                message:`Hello ${newUser.name},please click the link to activate your account:${activation_url}`,
              }
            )
            await newUser.save()
            res.status(200).json({status:true,message:"registration sucessfull"})
          } catch (error) {
              next(new Errorhadler("internal server error",500))
              console.log(error)
          }
         



      })
  
    
  }));


 userRoute.get("/activation/:token",catchAsyncError(async(req,res,next)=>{
             
       let token=req.params.token
       if(!token){
        next(new Errorhadler("token not found",404))
       }
       jwt.verify(token, process.env.SECRET, async(err, decoded)=> {
          if(err){
           return next(new Errorhadler("token is not valid",400))
          }
          
          let id=decoded.id
          await UserModel.findByIdAndUpdate(id,{isActivated:true})
          
          res.redirect("http://localhost:5173/login")
          
          res.status(200).json({status:true,message:"activation is completed"})

      });
      

  }))

  userRoute.post("/upload",upload.single("photo"),catchAsyncError(async(req,res,next)=>{
    if(!req.file){
      next(new Errorhadler("File not found",400))
    }

    res.status(200).json("Uploaded")
}))

userRoute.post("/login",catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email)
    if (!email || !password) {
     return next(new Errorhadler("email and password are reqires", 400));
    }

    let user = await UserModel.findOne({ email });
    console.log(user,"9999999999999")

    if (!user) {
      return next(new Errorhadler("Please Signup", 400));
    }

    if(!user.isActivated){
      return next(new Errorhadler("Please Signup", 400));
    }

    await bcrypt.compare(password, user.password, function(err, result) {
      if(err){
        return next(new Errorhadler("internal server error", 500));
      }
      if(!result){
        return next(new Errorhadler("password is incorrect", 400));
      }
      let token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 60 * 24 * 30,
      });
      res.cookie("accesstoken", token, {
        httpOnly: true,
        MaxAge: "5d",
      });
      res.status(200).json({status:true,message:"login successful"})

      
    });
  }));




  module.exports={userRoute}