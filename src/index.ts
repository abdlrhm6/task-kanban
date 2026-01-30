import express from "express";
import "dotenv/config";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use("/api/auth", authRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});