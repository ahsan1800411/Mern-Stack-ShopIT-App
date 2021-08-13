const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/products.json");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("All the Products are deleted");
    await Product.insertMany(products);
    console.log("All the products are inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedProducts();
