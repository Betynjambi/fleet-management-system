import express from "express";
import {
  logMaintenance,
  getMaintenanceHistory,
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/", logMaintenance);
router.get("/:vehicleId", getMaintenanceHistory);

export default router;