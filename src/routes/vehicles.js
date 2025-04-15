// Registers the routes and calls controller functions 

import express from "express";
import {
  createVehicle,
  getAllVehicles,
  getVehicleCount,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/count", getVehicleCount);
router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;
