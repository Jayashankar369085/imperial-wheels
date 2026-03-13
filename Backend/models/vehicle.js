const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  brand: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["car", "bike"],
    required: true
  },

  category: {
    type: String,
    enum: ["luxury", "sport", "cruiser"],
    required: true
  },

  fuelType: {
    type: String,
    enum: ["petrol", "diesel", "electric"],
    required: true
  },

  transmission: {
    type: String,
    enum: ["manual", "automatic"]
  },

  seats: {
    type: Number
  },

  pricePerDay: {
    type: Number,
    required: true
  },

  image: {
    type: String
  },

  description: {
    type: String
  },

  available: {
    type: Boolean,
    default: true
  },

  images: [
  {
    type: String
  }
]
},
{ timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);