const router = require("express").Router();
const { registerUser } = require("../controllers/authControllers");

router.route("/register").post(registerUser);

module.exports = router;
