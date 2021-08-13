const express = require("express");
const app = express();
const product = require("./routes/product");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/errors");
app.use(express.json());
app.use(cookieParser());

//  import all the routes
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware to catch the errors
app.use(errorMiddleware);

module.exports = app;
