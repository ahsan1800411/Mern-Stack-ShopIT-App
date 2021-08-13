// get all the products ==> /api/v1/products --> get request
exports.getProducts = (req, res, next) => {
  res.json({
    message: "All the Products",
  });
};
