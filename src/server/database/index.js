import Sequelize from "sequelize";
import configFile from "../config/"; // index
import models from "../models";

const env = process.env.NODE_ENV || "development";

const config = configFile[env];
console.log("config", config);
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  models: models(sequelize),
  sequelize,
};

export default db;
