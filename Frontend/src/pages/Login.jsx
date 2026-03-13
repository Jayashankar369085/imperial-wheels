import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

const navigate = useNavigate();

const [form, setForm] = useState({
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
    "https://imperial-wheels.onrender.com/api/auth/login",
    form
  );

  localStorage.setItem("token", res.data.token);

  alert("Login successful");

  navigate("/");

} catch (error) {

  alert("Invalid credentials");

}


};

return (


<div
  style={{
    background:"#0f0f0f",
    minHeight:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }}
>

  <form
    onSubmit={handleSubmit}
    style={{
      background:"#111",
      padding:"40px",
      borderRadius:"10px",
      width:"400px"
    }}
  >

    <h2 style={{color:"#d4af37", marginBottom:"20px"}}>
      Login
    </h2>

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

    <button className="btn btn-warning w-100">
      Login
    </button>

  </form>

</div>


);

}

export default Login;
