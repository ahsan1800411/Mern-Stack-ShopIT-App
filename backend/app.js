const express = require("express");
const app = express();
const product = require("./routes/product");
app.use(express.json());

//  import all the routes
app.use("/api/v1", product);

module.exports = app;
