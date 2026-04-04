import express from "express";
import { getDashboard } from "../../../controllers/dashboard.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../../middlewares/role.middleware.js";

const router = express.Router();

// 📊 Full dashboard
router.get(
  "/",
  protect,
  authorizeRoles("admin", "analyst", "viewer"),
  getDashboard
);

export default router;