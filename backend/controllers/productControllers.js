const Product = require("../models/product");
// create a new product ==> /api/v1/product/new == post request

exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// get all the products ==> /api/v1/products --> get request
exports.getProducts = (req, res, next) => {
  res.json({
    message: "All the Products",
  });
};
