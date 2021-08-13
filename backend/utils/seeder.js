const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("All the Products are deleted");
    await Product.insertMany();
    console.log("All the products are inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seeProducts();
