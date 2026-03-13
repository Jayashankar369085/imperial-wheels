import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BookingPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(!token){
      navigate("/login");
    }

  }, []);

  const [vehicle, setVehicle] = useState(null);

  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
    pickupLocation:"",
    startDate:"",
    endDate:""
  });

  const [card,setCard] = useState({
    cardName:"",
    cardNumber:"",
    expiry:"",
    cvv:""
  });

  useEffect(()=>{

    axios.get(`https://imperial-wheels.onrender.com/api/vehicles/${id}`)
      .then(res => setVehicle(res.data))
      .catch(err => console.log(err));

  },[id]);

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const handleCardChange = (e)=>{

    setCard({
      ...card,
      [e.target.name]:e.target.value
    });

  };

  const calculateDays = ()=>{

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);

    const diff = (end - start) / (1000*60*60*24);

    return diff > 0 ? diff : 0;

  };

  const days = calculateDays();

  const pricePerDay = vehicle ? vehicle.pricePerDay : 0;

  const totalPrice = days * pricePerDay;

  const handleSubmit = async (e)=>{

    e.preventDefault();

    const booking = {
      vehicleId:id,
      vehicleName:vehicle.name,
      ...form,
      totalPrice
    };

    try{

      await axios.post("https://imperial-wheels.onrender.com/api/bookings", booking);

      navigate("/confirmation",{state:booking});

    }
    catch(error){

      console.log(error);
      alert("Booking failed");

    }

  };

  if(!vehicle) return <h3 className="text-center mt-5">Loading vehicle...</h3>;

  return(

    <div
      style={{
        background:"#0f0f0f",
        minHeight:"100vh",
        paddingTop:"80px"
      }}
    >

      <div className="container" style={{maxWidth:"650px"}}>

        <div
          className="card shadow p-4"
          style={{
            background:"#1a1a1a",
            border:"1px solid #d4af37",
            color:"white"
          }}
        >

          <h2 className="text-center mb-4" style={{color:"#d4af37"}}>
            Book {vehicle.name}
          </h2>

          <form onSubmit={handleSubmit}>

            <h5>Customer Information</h5>

            <input
              className="form-control mb-3"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
            />

            <h5 className="mt-4">Rental Details</h5>

            <input
              className="form-control mb-3"
              name="pickupLocation"
              placeholder="Pickup Location"
              onChange={handleChange}
            />

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  onChange={handleChange}
                />
              </div>

            </div>

            <div
              style={{
                background:"#111",
                border:"1px solid #d4af37",
                borderRadius:"6px",
                padding:"15px"
              }}
            >

              <p>Vehicle: {vehicle.name}</p>
              <p>Price per day: ₹{pricePerDay}</p>
              <p>Days: {days}</p>

              <h4 style={{color:"#d4af37"}}>
                Total Price: ₹{totalPrice}
              </h4>

            </div>

            {/* PAYMENT SECTION */}

            <h5 className="mt-4">Card Details</h5>

            <input
              className="form-control mb-3"
              name="cardName"
              placeholder="Card Holder Name"
              onChange={handleCardChange}
              required
            />

            <input
              className="form-control mb-3"
              name="cardNumber"
              placeholder="Card Number"
              maxLength="16"
              onChange={handleCardChange}
              required
            />

            <div className="row">

              <div className="col-md-6 mb-3">

                <input
                  className="form-control"
                  name="expiry"
                  placeholder="MM/YY"
                  onChange={handleCardChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <input
                  className="form-control"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  onChange={handleCardChange}
                  required
                />

              </div>

            </div>

            <button
              className="btn w-100 mt-3"
              style={{
                background:"#d4af37",
                border:"none",
                fontWeight:"600"
              }}
            >
              Confirm Booking
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default BookingPage;