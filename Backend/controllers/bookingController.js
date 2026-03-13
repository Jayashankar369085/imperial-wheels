const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
exports.createBooking = async (req, res) => {
  try {

    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    res.json(savedBooking);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};

exports.updateBookingStatus = async (req, res) => {

  console.log("Status update request received");

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = req.body.status;

    await booking.save();

    let subject = "";
    let message = "";

    if (booking.status === "approved") {

      subject = "Imperial Wheels Booking Approved";

      message = `
Hello ${booking.name},

Your booking request has been APPROVED.

Vehicle: ${booking.vehicleName}
Start Date: ${booking.startDate.toISOString().substring(0,10)}
End Date: ${booking.endDate.toISOString().substring(0,10)}

Our team will contact you shortly regarding payment.

Thank you for choosing Imperial Wheels.

Regards,
Imperial Wheels
`;

    }

    if (booking.status === "rejected") {

      subject = "Imperial Wheels Booking Update";

      message = `
Hello ${booking.name},

Unfortunately your booking request for ${booking.vehicleName}
could not be approved due to availability.

Please try booking another vehicle.

Regards,
Imperial Wheels
`;

    }

    await transporter.sendMail({

      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: subject,
      text: message

    });
console.log("Sending email to:", booking.email);
    res.json(booking);

  } catch (error) {

  console.error("EMAIL ERROR:", error);

  res.status(500).json({ message: error.message });

}

};

exports.getBookings = async (req, res) => {

  try {

    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};