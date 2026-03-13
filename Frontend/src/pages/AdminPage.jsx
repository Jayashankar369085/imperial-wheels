import { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {

  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    brand: "",
    type: "car",
    category: "",
    fuelType: "",
    transmission: "",
    seats: "",
    pricePerDay: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
    description: ""
  });

  const API = "https://imperial-wheels.onrender.com/api";

  useEffect(() => {
    fetchBookings();
    fetchVehicles();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/bookings`);
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API}/vehicles`);
      setVehicles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {

      await axios.put(`${API}/bookings/${id}`, { status });

      // refresh booking list instantly
      fetchBookings();

    } catch (error) {
      console.log(error);
    }
  };

  const handleVehicleChange = (e) => {
    setVehicleForm({
      ...vehicleForm,
      [e.target.name]: e.target.value
    });
  };

  const editVehicle = (vehicle) => {

    setVehicleForm({
      name: vehicle.name || "",
      brand: vehicle.brand || "",
      type: vehicle.type || "car",
      category: vehicle.category || "",
      fuelType: vehicle.fuelType || "",
      transmission: vehicle.transmission || "",
      seats: vehicle.seats || "",
      pricePerDay: vehicle.pricePerDay || "",
      image: vehicle.image || "",
      image1: vehicle.images?.[0] || "",
      image2: vehicle.images?.[1] || "",
      image3: vehicle.images?.[2] || "",
      description: vehicle.description || ""
    });

    setEditingVehicleId(vehicle._id);
  };

  const saveVehicle = async (e) => {

    e.preventDefault();

    const vehicleData = {
      name: vehicleForm.name,
      brand: vehicleForm.brand,
      type: vehicleForm.type,
      category: vehicleForm.category,
      fuelType: vehicleForm.fuelType,
      transmission: vehicleForm.transmission,
      seats: Number(vehicleForm.seats),
      pricePerDay: Number(vehicleForm.pricePerDay),
      image: vehicleForm.image,
      images: [
        vehicleForm.image1,
        vehicleForm.image2,
        vehicleForm.image3
      ].filter(Boolean),
      description: vehicleForm.description
    };

    try {

      if (editingVehicleId) {

        await axios.put(
          `${API}/vehicles/${editingVehicleId}`,
          vehicleData
        );

        alert("Vehicle Updated");

      } else {

        await axios.post(
          `${API}/vehicles`,
          vehicleData
        );

        alert("Vehicle Added");

      }

      setEditingVehicleId(null);

      setVehicleForm({
        name:"",
        brand:"",
        type:"car",
        category:"",
        fuelType:"",
        transmission:"",
        seats:"",
        pricePerDay:"",
        image:"",
        image1:"",
        image2:"",
        image3:"",
        description:""
      });

      fetchVehicles();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteVehicle = async (id) => {

    try {

      await axios.delete(`${API}/vehicles/${id}`);
      fetchVehicles();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div style={{
      padding:"80px",
      background:"#0f0f0f",
      minHeight:"100vh",
      color:"white"
    }}>

      <h1 style={{color:"#d4af37"}}>Admin Dashboard</h1>

      {/* BOOKINGS */}

      <h3 style={{marginTop:"40px"}}>Booking Requests</h3>

      <table style={{width:"100%",marginTop:"20px"}}>

        <thead>
          <tr style={{background:"#111",color:"#d4af37"}}>
            <th>Name</th>
            <th>Email</th>
            <th>Vehicle</th>
            <th>Start</th>
            <th>End</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map(b => (

            <tr key={b._id}>

              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.vehicleName}</td>
              <td>{b.startDate?.substring(0,10)}</td>
              <td>{b.endDate?.substring(0,10)}</td>

              <td style={{color:"#d4af37"}}>
                ₹{b.totalPrice}
              </td>

              <td style={{
                fontWeight:"bold",
                color:
                  b.status === "approved"
                    ? "#28a745"
                    : b.status === "rejected"
                    ? "#dc3545"
                    : "#ffc107"
              }}>
                {b.status}
              </td>

              <td>

                {b.status === "pending" && (

                  <>
                    <button
                      onClick={() => updateStatus(b._id,"approved")}
                      style={{
                        background:"green",
                        border:"none",
                        padding:"5px 10px",
                        marginRight:"10px",
                        color:"white"
                      }}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(b._id,"rejected")}
                      style={{
                        background:"red",
                        border:"none",
                        padding:"5px 10px",
                        color:"white"
                      }}
                    >
                      Reject
                    </button>
                  </>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* VEHICLE FORM */}

      <h3 style={{marginTop:"60px"}}>
        {editingVehicleId ? "Update Vehicle" : "Add Vehicle"}
      </h3>

      <form
        onSubmit={saveVehicle}
        style={{
          background:"#111",
          padding:"20px",
          borderRadius:"10px",
          marginTop:"20px",
          maxWidth:"600px"
        }}
      >

        <input name="name" value={vehicleForm.name} onChange={handleVehicleChange} placeholder="Vehicle Name" className="form-control mb-2"/>

        <input name="brand" value={vehicleForm.brand} onChange={handleVehicleChange} placeholder="Brand" className="form-control mb-2"/>

        <select name="type" value={vehicleForm.type} onChange={handleVehicleChange} className="form-control mb-2">
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>

        <select name="category" value={vehicleForm.category} onChange={handleVehicleChange} className="form-control mb-2">
          <option value="">Category</option>
          <option value="luxury">Luxury</option>
          <option value="sport">Sport</option>
        </select>

        <select name="fuelType" value={vehicleForm.fuelType} onChange={handleVehicleChange} className="form-control mb-2">
          <option value="">Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>

        <select name="transmission" value={vehicleForm.transmission} onChange={handleVehicleChange} className="form-control mb-2">
          <option value="">Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>

        <input type="number" name="seats" value={vehicleForm.seats} onChange={handleVehicleChange} placeholder="Seats" className="form-control mb-2"/>

        <input type="number" name="pricePerDay" value={vehicleForm.pricePerDay} onChange={handleVehicleChange} placeholder="Price Per Day" className="form-control mb-2"/>

        <input name="image" value={vehicleForm.image} onChange={handleVehicleChange} placeholder="Main Image URL" className="form-control mb-2"/>

        <input name="image1" value={vehicleForm.image1} onChange={handleVehicleChange} placeholder="Gallery Image 1" className="form-control mb-2"/>

        <input name="image2" value={vehicleForm.image2} onChange={handleVehicleChange} placeholder="Gallery Image 2" className="form-control mb-2"/>

        <input name="image3" value={vehicleForm.image3} onChange={handleVehicleChange} placeholder="Gallery Image 3" className="form-control mb-2"/>

        <textarea name="description" value={vehicleForm.description} onChange={handleVehicleChange} placeholder="Vehicle Description" className="form-control mb-2"/>

        <button className="btn btn-warning mt-2">
          {editingVehicleId ? "Update Vehicle" : "Add Vehicle"}
        </button>

      </form>

      {/* VEHICLE LIST */}

      <h3 style={{marginTop:"60px"}}>Manage Vehicles</h3>

      {vehicles.map(v => (

        <div key={v._id} style={{
          background:"#111",
          padding:"15px",
          marginBottom:"10px",
          borderRadius:"6px",
          display:"flex",
          justifyContent:"space-between"
        }}>

          <span>{v.name} — ₹{v.pricePerDay}</span>

          <div>

            <button
              onClick={() => editVehicle(v)}
              style={{
                background:"#d4af37",
                border:"none",
                padding:"5px 12px",
                marginRight:"10px"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteVehicle(v._id)}
              style={{
                background:"red",
                border:"none",
                padding:"5px 12px",
                color:"white"
              }}
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  );

}

export default AdminPage;