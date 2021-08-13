const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is up and running at port ${process.env.PORT} in  ${process.env.NODE_ENV} mode.`
  );
});
