import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VehicleList({ search }) {

  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {

    axios.get("http://localhost:5000/api/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.error(err));

  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {

    const matchesType =
      filter === "all" || vehicle.type === filter;

    const matchesSearch =
      vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSearch;

  });

  return (

    <div style={{ padding: "40px" }}>

      <h2 style={{ marginBottom: "20px" }}>
        Available Vehicles
      </h2>

      <div style={{ marginBottom: "20px" }}>

        <button
          onClick={() => setFilter("all")}
          style={{ marginRight: "10px" }}
        >
          All
        </button>

        <button
          onClick={() => setFilter("car")}
          style={{ marginRight: "10px" }}
        >
          Cars
        </button>

        <button
          onClick={() => setFilter("bike")}
        >
          Bikes
        </button>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >

        {filteredVehicles.map(vehicle => (

          <div
            key={vehicle._id}
            style={{
              background: "#1e1e1e",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)"
            }}
          >

            <img
              src={vehicle.image}
              alt={vehicle.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "15px" }}>

              <h3>{vehicle.name}</h3>

              <p><b>Brand:</b> {vehicle.brand}</p>
              <p><b>Category:</b> {vehicle.category}</p>
              <p><b>Fuel:</b> {vehicle.fuelType}</p>

              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                ₹{vehicle.pricePerDay} / day
              </p>

              <Link to={`/vehicle/${vehicle._id}`}>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 12px",
                    background: "#ff4d00",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    color: "white"
                  }}
                >
                  View Details
                </button>
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default VehicleList;