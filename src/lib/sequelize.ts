import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD!,
  {
    host: process.env.MYSQL_HOST!,
    dialect: "mysql",
  }
);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error(error);
  }
};

export { sequelize, connectToDB };
