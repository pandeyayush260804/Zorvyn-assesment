import express from "express";
import {
  createUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser
} from "../../../controllers/user.controller.js";

import { protect } from "../../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../../middlewares/role.middleware.js";

const router = express.Router();

// 🔓 Public routes
router.post("/register", createUser);
router.post("/login", loginUser);

// 🔒 Protected + RBAC
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

router.put("/:id", protect, authorizeRoles("admin"), updateUser);

router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;