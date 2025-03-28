let express = require("express")
const UserModel = require("../model/userModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const Errorhadler = require("../utils/errorhadler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { sendMail } = require("../utils/mail")
let userRoute = express.Router()
const { upload } = require("../middleware/multer")
const auth = require("../middleware/auth")
const path = require("path")
const orderModel = require("../model/orderModel")
const mongoose=require("mongoose")




userRoute.post("/signup", catchAsyncError(async (req, res, next) => {
  console.log(req.body)


  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    next(new Errorhadler("name,email and password required", 400))
  }
  let user = await UserModel.findOne({ email: email })
  if (user) {
    next(new Errorhadler("user is already exist..........", 400))
  }

  bcrypt.hash(password, 5, async (err, hash) => {

    if (err) {
      next(new Errorhadler("server error", 500))
    }
    let newUser = new UserModel({ name, email, password: hash })



    let token = jwt.sign({ id: newUser._id }, process.env.SECRET, { expiresIn: 60 * 60 * 60 * 60860 })
    let PORT = process.env.PORT
    let activation_url = `http://localhost:${PORT}/user/activation/${token}`
    try {
      await sendMail(
        {
          email: newUser.email,
          subject: "Activate your account",
          message: `Hello ${newUser.name},please click the link to activate your account:${activation_url}`,
        }
      )
      await newUser.save()
      res.status(200).json({ status: true, message: "registration sucessfull" })
    } catch (error) {
      next(new Errorhadler("internal server error", 500))
      console.log(error)
    }




  })


}));


userRoute.get("/activation/:token", catchAsyncError(async (req, res, next) => {

  let token = req.params.token
  if (!token) {
    next(new Errorhadler("token not found", 404))
  }
  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) {
      next(new Errorhadler("token is not valid", 400))
    }

    let id = decoded.id
    await UserModel.findByIdAndUpdate(id, { isActivated: true })

    res.redirect("http://localhost:5173/login")

    res.status(200).json({ status: true, message: "activation is completed" })

  });


}))

userRoute.post("/upload", auth, upload.single("photo"), catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new Errorhadler("File not found", 400))
  }
  const userId = req.user_id
  if (!userId) {
    return next(new Errorhadler("userId not found", 400))
  }
  const fileName = path.basename(req.file.path)
  let updated = await UserModel.findByIdAndUpdate(userId, { profilePhoto: fileName }, { new: true })
  res.status(200).json({ message: updated })
}))

userRoute.post("/login", catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email)
  if (!email || !password) {
    return next(new Errorhadler("email and password are reqires", 400));
  }

  let user = await UserModel.findOne({ email });

  if (!user) {
    return next(new Errorhadler("Please Signup", 400));
  }

  if (!user.isActivated) {
    return next(new Errorhadler("Please Signup", 400));
  }

  await bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return next(new Errorhadler("internal server error", 500));
    }
    if (!result) {
      return next(new Errorhadler("password is incorrect", 400));
    }

    let token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 1000 * 60 * 60 * 60 * 24,
    });
    res.cookie("accesstoken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });


    res.status(200).json({ status: true, message: "login successful", token })


  });
}));


userRoute.get("/checklogin", auth, catchAsyncError(async (req, res, next) => {

  let userId = req.user_id
  if (!userId) {
    return next(new Errorhadler("user id not found", 400));
  }
  let user = await UserModel.findById(userId).select("name email role address profilePhoto");
  res.status(200).json({ status: true, message: user })
}));


userRoute.put("/add-address", auth, catchAsyncError(async (req, res, next) => {
  console.log("hello")
  let userId = req.user_id
  if (!userId) {
    return next(new Errorhadler("user id not found", 400));
  }
  const { country, city, address, pincode, addressType } = req.body

  if (!country || !city || !address || !pincode || !addressType) {
    return next(new Errorhadler("country,city,address,pincode,addressType all feilda are required", 400));
  }
  let user = await UserModel.findByIdAndUpdate(userId,
    { $push: { address: req.body } },
    { new: true })
  res.status(200).json({ status: true, message: user })
}));


userRoute.post("/order", auth, catchAsyncError(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let userId = req.user_id
   
    if (!userId) {
      return next(new Errorhadler("user id not found", 400));
    }
    let user =await UserModel.findById(userId)
    let mailId = user.email
    let userName = user.name
    const { orderItems, shippingAddress, totalAmount } = req.body
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return next(new Errorhadler("At least one order item is required", 400));
    }
    for (let item of orderItems) {
      if (!item.product || !item.quantity || !item.price) {
        return next(new Errorhadler("Each order item must include product, quantity, and price", 400));
      }
      if (item.quantity < 1) {
        return next(new Errorhadler("Quantity cannot be less than 1", 400));
      }
      if (item.price < 0) {
        return next(new Errorhadler("Price cannot be negative", 400));
      }
    }

    if (!shippingAddress ||
      !shippingAddress.country ||
      !shippingAddress.city ||
      !shippingAddress.address ||
      !shippingAddress.pincode ||
      !shippingAddress.addressType) {
      return next(new Errorhadler("All shipping address fields are required (country, city, address, pincode, addressType)", 400));
    }

    if (typeof totalAmount !== "number" || totalAmount <= 0) {
      return next(new Errorhadler("Total amount must be a positive number", 400));
    }

    let newOrder = new orderModel({
      orderItems,
      shippingAddress,
      totalAmount,
      user: userId,
    });
    console.log(mailId)
    await newOrder.save({ session });
    await UserModel.findByIdAndUpdate(userId, { cart: [] }, { session })
    

    await sendMail(
      {
        email: mailId,
        subject: "order placed successfully",
        message: `Hello ${userName},your order placed successfully, `,
      }
    )
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Order placed successfully"
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new Errorhadler(error.message, 400));
  }
}));











module.exports = { userRoute }