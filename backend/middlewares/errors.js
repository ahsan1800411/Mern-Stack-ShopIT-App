const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      sucess: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let { ...error } = err;
    error.message = err.message;
    // Wrong Mongoose Object Id Error
    if (err.name === "CastError") {
      const message = `Resource not Found Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((err) => err.message);
      error = new ErrorHandler(message, 400);
    }

    // handling mongoose duplicate  key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    //  Handling Wrong JWT Error
    if (err.code === "JsonWebToken") {
      const message = "Json Web Token is invalid, Try Again";
      error = new ErrorHandler(message, 400);
    }

    //  Handling Expire JWT Error
    if (err.code === "TokenExpiredError") {
      const message = "Json Web Token is Expired, Try Again";
      error = new ErrorHandler(message, 400);
    }

    res.status(errpr.statusCode).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
