import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ setSearch }) {

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

  }, []);

  const handleSearch = (e) => {

    const value = e.target.value;

    setText(value);
    setSearch(value);

  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    setLoggedIn(false);

    navigate("/");

  };

  return (

    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "#000",
        borderBottom: "1px solid #d4af37"
      }}
    >

      <div className="container">

        {/* Brand */}

        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "#d4af37",
            fontWeight: "bold",
            fontSize: "22px"
          }}
        >
          Imperial Wheels
        </Link>


        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: "#d4af37" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Search Bar */}

          <form
            className="d-flex mx-auto"
            style={{
              width: "100%",
              maxWidth: "700px"
            }}
          >

            <input
              type="text"
              placeholder="Search vehicles..."
              value={text}
              onChange={handleSearch}
              className="form-control"
              style={{
                background: "#111",
                border: "1px solid #d4af37",
                color: "white"
              }}
            />

          </form>


          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "#d4af37" }}
              >
                Home
              </Link>
            </li>


            <li className="nav-item">
              <a
                className="nav-link"
                href="#vehicles"
                style={{ color: "#d4af37" }}
              >
                Vehicles
              </a>
            </li>


            


            {/* Login/Register if not logged in */}

            {!loggedIn && (

              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{ color: "#d4af37" }}
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{ color: "#d4af37" }}
                  >
                    Register
                  </Link>
                </li>
              </>

            )}


            {/* Logout if logged in */}

            {loggedIn && (

              <li className="nav-item">

                <button
                  onClick={handleLogout}
                  style={{
                    background: "#d4af37",
                    border: "none",
                    padding: "8px 15px",
                    marginLeft: "10px",
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>

              </li>

            )}

            {/* Admin Button */}

            <li className="nav-item">

              <Link to="/admin">

                <button
                  style={{
                    background: "#d4af37",
                    border: "none",
                    padding: "8px 15px",
                    marginLeft: "10px",
                    cursor: "pointer"
                  }}
                >
                  Admin
                </button>

              </Link>

            </li>

          </ul>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;