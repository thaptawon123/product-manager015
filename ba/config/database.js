import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

const envCandidates = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "ba/.env"),
  path.resolve(process.cwd(), "../.env"),
];

for (const envPath of envCandidates) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

const sequelize = new Sequelize(
  process.env.DB_NAME || "product_db",
  process.env.DB_USER || "dav_user",
  process.env.DB_PASSWORD || "dev_password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");
    await sequelize.sync({
      alter: process.env.DB_SYNC_ALTER === "development",
    });
    return true;
  } catch (error) {
    console.error("Connection failed:", error.message);
    return false;
  }
};

export default sequelize;
