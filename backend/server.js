const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling UnCaught  Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.stack}`);
  console.log(`Shutting down the server due to UnCaught Exceptions`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();
// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is up and running at port ${process.env.PORT} in  ${process.env.NODE_ENV} mode.`
  );
});

// Handling UnHandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.stack}`);
  console.log(`Shutting down the server due to UnHandle Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
