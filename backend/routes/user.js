const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authControllers");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
