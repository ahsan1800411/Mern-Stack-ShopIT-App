const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productControllers");

const router = require("express").Router();

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct);

module.exports = router;
