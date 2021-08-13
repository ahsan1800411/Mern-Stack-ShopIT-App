const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
// register A NEW user ==> /api/v1/register ==> post request

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Ahsan",
      url: "https://unsplash.com",
    },
  });
  sendToken(user, 201, res);
});

// login a user ==> /api/v1/login ==> post request
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 400));
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 400));
  }
  sendToken(user, 201, res);
});
