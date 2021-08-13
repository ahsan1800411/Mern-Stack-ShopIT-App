const express = require("express");
const app = express();
const product = require("./routes/product");
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());

//  import all the routes
app.use("/api/v1", product);
// Middleware to catch the errors
app.use(errorMiddleware);

module.exports = app;
