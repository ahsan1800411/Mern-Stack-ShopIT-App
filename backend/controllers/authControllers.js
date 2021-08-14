const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
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

// Forgot password ==> /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found With this Email", 404));
  }
  // Get Reset Password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token os as follows :\n\n${resetUrl}\n\nIf you have not requested this email, Please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// logout user ==> /api/v1/logout ==> get request
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
