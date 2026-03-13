import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      if (error.response && error.response.data) {

        alert(error.response.data.message || "Registration failed");

      } else {

        alert("Server error");

      }

    }

  };

  return (

    <div style={{
      background:"#0f0f0f",
      minHeight:"100vh",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <form
        onSubmit={handleSubmit}
        style={{
          background:"#111",
          padding:"40px",
          borderRadius:"10px",
          width:"400px",
          border:"1px solid #d4af37"
        }}
      >

        <h2 style={{color:"#d4af37",marginBottom:"20px"}}>
          Register
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />

        <button
          className="btn w-100"
          style={{
            background:"#d4af37",
            border:"none",
            fontWeight:"600"
          }}
        >
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;