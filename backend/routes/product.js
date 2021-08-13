const {
  getProducts,
  newProduct,
} = require("../controllers/productControllers");

const router = require("express").Router();

router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);

module.exports = router;
