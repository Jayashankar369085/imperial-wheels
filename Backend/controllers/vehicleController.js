const Vehicle = require("../models/vehicle");

// GET all vehicles
exports.getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
};

// ADD vehicle
exports.addVehicle = async (req, res) => {
  const vehicle = new Vehicle(req.body);
  const savedVehicle = await vehicle.save();
  res.json(savedVehicle);
};

// UPDATE vehicle
exports.updateVehicle = async (req, res) => {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedVehicle);
};

// DELETE vehicle
exports.deleteVehicle = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: "Vehicle deleted" });
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMultipleVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.insertMany(req.body);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};