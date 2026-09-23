import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { connectDB } from "./config/database.js";

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
const PORT = Number(process.env.PORT || 4000);
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from the backend!" });
});
add.use("/api/products", productRouter);
await connectDB();

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
