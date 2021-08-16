const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyPasrser = require("body-parser");
const cloudinary = require("cloudinary");
const product = require("./routes/product");
const user = require("./routes/user");
const order = require("./routes/order");
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(bodyPasrser.urlencoded({ extended: true }));
app.use(cookieParser());

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  import all the routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware to catch the errors
app.use(errorMiddleware);

module.exports = app;
