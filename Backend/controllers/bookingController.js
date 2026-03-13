const Booking = require("../models/booking");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


/* ================= CREATE BOOKING ================= */

exports.createBooking = async (req, res) => {

  try {

    const booking = new Booking(req.body);

    const savedBooking = await booking.save();

    res.json(savedBooking);

  } catch (error) {

    console.error("BOOKING ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


/* ================= UPDATE BOOKING STATUS ================= */

exports.updateBookingStatus = async (req, res) => {

  try {

    console.log("Status update request received");

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    booking.status = req.body.status;

    await booking.save();

    let subject = "";
    let htmlMessage = "";


    /* ===== APPROVED EMAIL ===== */

    if (booking.status === "approved") {

      subject = "Imperial Wheels Booking Approved";

      htmlMessage = `
        <h2>Imperial Wheels</h2>

        <p>Hello <b>${booking.name}</b>,</p>

        <p>Your booking request has been 
        <b style="color:green;">APPROVED</b>.</p>

        <p><b>Vehicle:</b> ${booking.vehicleName}</p>
        <p><b>Start Date:</b> ${booking.startDate.toISOString().substring(0,10)}</p>
        <p><b>End Date:</b> ${booking.endDate.toISOString().substring(0,10)}</p>

        <p>Our team will contact you shortly regarding payment.</p>

        <br/>

        <p>Thank you for choosing <b>Imperial Wheels</b>.</p>
      `;

    }


    /* ===== REJECTED EMAIL ===== */

    if (booking.status === "rejected") {

      subject = "Imperial Wheels Booking Update";

      htmlMessage = `
        <h2>Imperial Wheels</h2>

        <p>Hello <b>${booking.name}</b>,</p>

        <p>Unfortunately your booking request for 
        <b>${booking.vehicleName}</b> could not be approved due to availability.</p>

        <p>Please try booking another vehicle.</p>

        <br/>

        <p>Regards,<br/>Imperial Wheels</p>
      `;

    }


    /* ================= SEND EMAIL ================= */

    try {

      await resend.emails.send({

        from: "Imperial Wheels <onboarding@resend.dev>",
        to: booking.email,
        subject: subject,
        html: htmlMessage

      });

      console.log("Email sent successfully to:", booking.email);

    } catch (mailError) {

      console.error("EMAIL ERROR:", mailError);

    }


    res.json(booking);

  } catch (error) {

    console.error("STATUS UPDATE ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};


/* ================= GET BOOKINGS ================= */

exports.getBookings = async (req, res) => {

  try {

    const bookings = await Booking
      .find()
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (error) {

    console.error("FETCH BOOKINGS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

};