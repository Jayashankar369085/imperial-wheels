const express = require("express");
const router = express.Router();
const { getBookings } = require("../controllers/bookingController");
const { createBooking } = require("../controllers/bookingController");
const { updateBookingStatus } = require("../controllers/bookingController");

router.put("/:id", updateBookingStatus);
router.post("/", createBooking);
router.get("/", getBookings);
module.exports = router;