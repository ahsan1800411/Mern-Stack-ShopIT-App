const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is up and running at port ${process.env.PORT} in  ${process.env.NODE_ENV} mode.`
  );
});

// Handling UnHandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to UnHandle Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
