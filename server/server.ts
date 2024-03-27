import dotenv from "dotenv";
import _app from "./app";
dotenv.config({ path: "./config.env" });
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "realtime-chat",
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const port = process.env.PORT || 9000;
_app.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
