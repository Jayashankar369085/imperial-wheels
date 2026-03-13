import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {

  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {

    return (

      <div className="container mt-5 text-center">

        <h3>No booking request found</h3>

        <button
          className="btn btn-warning mt-3"
          onClick={()=>navigate("/")}
        >
          Back to Home
        </button>

      </div>

    );

  }

  return (

    <div
      style={{
        background:"#0f0f0f",
        minHeight:"100vh",
        paddingTop:"80px"
      }}
    >

      <div className="container">

        <div
          className="card shadow p-4"
          style={{
            background:"#1a1a1a",
            border:"1px solid #d4af37",
            color:"white"
          }}
        >

          <h2 className="text-center mb-3" style={{color:"#d4af37"}}>
            Booking Request Recorded
          </h2>

          <p className="text-center">
            Thank you for choosing <b>Imperial Wheels</b>.
          </p>

          <p className="text-center">
            Your booking request has been successfully recorded.
            Our team will verify the availability of the selected vehicle.
          </p>

          <p className="text-center">
            You will be contacted shortly through your email address
            with further payment instructions and booking confirmation.
          </p>

          <hr/>

          <h4>Booking Summary</h4>

          <p><b>Name:</b> {booking.name}</p>
          <p><b>Email:</b> {booking.email}</p>
          <p><b>Phone:</b> {booking.phone}</p>

          <p><b>Pickup Location:</b> {booking.pickupLocation}</p>

          <p><b>Start Date:</b> {booking.startDate}</p>
          <p><b>End Date:</b> {booking.endDate}</p>

          <h4 style={{color:"#d4af37"}}>
            Estimated Total: ₹{booking.totalPrice}
          </h4>

          <div className="text-center mt-4">

            <button
              className="btn"
              style={{
                background:"#d4af37",
                border:"none",
                fontWeight:"600"
              }}
              onClick={()=>navigate("/")}
            >
              Back to Home
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Confirmation;