import express from "express";
import userRoutes from "./user.routes.js";
import recordRoutes from "./record.routes.js";
import dashboardRoutes from "./dashboard.routes.js"; 

const router = express.Router();

// 🔗 Mount all modules
router.use("/users", userRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes); 

// 🔍 Health check
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

export default router;