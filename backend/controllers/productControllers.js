const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// create a new product ==> /api/v1/admin/product/new == post request

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all the products ==> /api/v1/products --> get request
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search();
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

//  get a single product ==> /api/v1/product/:id == get request
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));

  res.status(200).json({
    success: true,

    product,
  });
});

// update a  product ==> /api/v1/admin/product/:id == put request
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,

    product,
  });
});

//  delete product ==> /api/v1/product/:id == delete request
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found", 404));
  product.remove();
  res.status(200).json({
    success: true,
  });
});
