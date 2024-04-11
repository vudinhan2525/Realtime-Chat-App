import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "realtime-chat",
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    logging: false,
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
export { sequelize };
import server from "./app";

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`App is running in port ${port}`);
});
