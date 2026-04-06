import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "../../../controllers/record.controller.js";

import { protect } from "../../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../../middlewares/role.middleware.js";

const router = express.Router();

//All routes are protected
router.use(protect);

//Create record → Admin only
router.post("/", authorizeRoles("admin"), createRecord);

//Get records → Admin + Analyst
router.get("/", authorizeRoles("admin", "analyst"), getRecords);

//Update record → Admin only
router.put("/:id", authorizeRoles("admin"), updateRecord);

//Delete record → Admin only
router.delete("/:id", authorizeRoles("admin"), deleteRecord);

export default router;