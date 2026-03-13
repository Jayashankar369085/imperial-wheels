import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.jsx";
import Hero from "./components/Hero";
import VehicleList from "./components/VehicleList";

import VehicleDetails from "./pages/VehicleDetails";
import BookingPage from "./pages/BookingPage";
import Confirmation from "./pages/confirmation.jsx";
import AdminPage from "./pages/AdminPage";
import AdminGate from "./pages/AdminGate";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const [search, setSearch] = useState("");

  return (

    <div>

      <Navbar setSearch={setSearch} />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Hero />
              <div id="vehicles">
                <VehicleList search={search} />
              </div>
            </>
          }
        />

        <Route
          path="/vehicle/:id"
          element={<VehicleDetails />}
        />

        <Route
          path="/booking/:id"
          element={<BookingPage />}
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />

        {/* ADMIN PASSWORD PAGE */}
        <Route
          path="/admin"
          element={<AdminGate />}
        />

        {/* REAL ADMIN DASHBOARD */}
        <Route
          path="/admin-panel"
          element={<AdminPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </div>

  );

}

export default App;