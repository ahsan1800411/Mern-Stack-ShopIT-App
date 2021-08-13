const { getProducts } = require("../controllers/productControllers");

const router = require("express").Router();

router.route("/products").get(getProducts);
