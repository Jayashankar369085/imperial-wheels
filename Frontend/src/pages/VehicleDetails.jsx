import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VehicleDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!vehicle) return <h2 style={{padding:"80px"}}>Loading...</h2>;

  return (
    <div style={{ padding: "80px", maxWidth: "1100px", margin: "auto" }}>

      <h1 style={{ color: "#d4af37", marginBottom: "20px" }}>
        {vehicle.name}
      </h1>

      {/* MAIN IMAGE */}
      <img
        src={vehicle.image}
        alt={vehicle.name}
        style={{
          width: "100%",
          height: "450px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      />

      {/* IMAGE GALLERY */}
      {vehicle.images && vehicle.images.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}
        >
          {vehicle.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="vehicle"
              style={{
                width: "300px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "6px",
                border: "1px solid #d4af37",
                cursor: "pointer"
              }}
            />
          ))}
        </div>
      )}

      {/* VEHICLE DETAILS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px"
        }}
      >
        <div>
          <p><b>Brand:</b> {vehicle.brand}</p>
          <p><b>Category:</b> {vehicle.category}</p>
          <p><b>Fuel Type:</b> {vehicle.fuelType}</p>
          <p><b>Transmission:</b> {vehicle.transmission}</p>
          <p><b>Seats:</b> {vehicle.seats}</p>
        </div>

        <div>
          <h2 style={{ color: "#d4af37" }}>
            ₹{vehicle.pricePerDay} / day
          </h2>

          <p style={{ marginTop: "10px" }}>
            {vehicle.description}
          </p>

          <button
            onClick={() => navigate(`/booking/${vehicle._id}`)}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              fontSize: "16px",
              background: "#d4af37",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Book Now
          </button>
        </div>
      </div>

    </div>
  );
}

export default VehicleDetails;