const express = require("express");
const router = express.Router();

const {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleById,
  addMultipleVehicles
} = require("../controllers/vehicleController");

router.get("/", getVehicles);

router.post("/", addVehicle);
router.post("/bulk", addMultipleVehicles);

router.get("/:id", getVehicleById);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

module.exports = router;