import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import saleRoutes from "./routes/sale.route.js";
import inventoryRoutes from "./routes/inventory.route.js";
import reportRoutes from "./routes/report.route.js";
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    https://sari-sari-store-app-gamma.vercel.app/"
  ],
  credentials: true,
}));

app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reports", reportRoutes);
export { app };
export default app;
