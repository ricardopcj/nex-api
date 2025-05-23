import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import { sequelize } from "../src/lib/sequelize";
import "./models/index";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

routes(app);

// fix: promise, need be async
sequelize.sync();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
