const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = require("express").Router();
const { newOrder } = require("../controllers/orderControllers");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
