const express = require("express");
const app = express();
const product = require("./routes/product");
const user = require("./routes/user");

const errorMiddleware = require("./middlewares/errors");
app.use(express.json());

//  import all the routes
app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware to catch the errors
app.use(errorMiddleware);

module.exports = app;
