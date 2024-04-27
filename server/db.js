import { Sequelize } from "sequelize";
import { DB_HOST, DB_DATABASE, DB_PASSWORD, DB_USER } from "./config.js";

export const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
