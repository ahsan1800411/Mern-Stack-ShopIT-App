const {
  getProducts,
  newProduct,
  getSingleProduct,
} = require("../controllers/productControllers");

const router = require("express").Router();

router.route("/products").get(getProducts);
router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);

module.exports = router;
