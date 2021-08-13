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
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//  get a single product ==> /api/v1/product/:id == get request
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  res.status(200).json({
    success: true,

    product,
  });
};
