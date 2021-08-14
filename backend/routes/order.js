const router = require("express").Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/orderControllers");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;
