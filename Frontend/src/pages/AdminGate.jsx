import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminGate() {

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();

    if(password === "ImperialWheelsAdmin"){
      navigate("/admin-panel");
    }
    else{
      alert("Incorrect Admin Password");
    }

  };

  return(

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
          border:"1px solid #d4af37"
        }}
      >

        <h2 style={{color:"#d4af37"}}>
          Admin Access
        </h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          className="form-control mt-3"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="btn mt-3 w-100"
          style={{
            background:"#d4af37",
            border:"none"
          }}
        >
          Enter
        </button>

      </form>

    </div>

  );

}

export default AdminGate;