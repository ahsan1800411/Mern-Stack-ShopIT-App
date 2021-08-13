const router = require("express").Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.route("/products").get(getProducts);
router.route("/admin/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
