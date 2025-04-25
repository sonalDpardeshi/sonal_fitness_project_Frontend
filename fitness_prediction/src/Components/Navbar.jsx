import React,{useState,useRef,useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import logo from "../assets/logoicon.jpg"

const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowSubmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className="navbar custom-navbar navbar-expand-lg navbar-dark bg-dark px-3">
      
      <div className="container-fluid">
        <img src={logo} alt="logo image" className="logoimg" />
        <NavLink className="navbar-brand fw-bold" to="/">
          Plan<span className="title">2</span>Fit
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>

            {/* Workouts */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </li>

            {/* Account Dropdown */}
            <li className="nav-item dropdown" ref={dropdownRef}>
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="#"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDropdown(!showDropdown);
                      setShowSubmenu(false); // Reset submenu when reopening
                    }}
                  >
                    Account
                  </a>

                  {showDropdown && (
                    <ul className="dropdown-menu bg-dark show" style={{ display: "block" }}>
                      <li>
                        <NavLink className="dropdown-item text-light" to="/account/admin">
                          Admin
                        </NavLink>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-light"
                          onClick={() => setShowSubmenu(!showSubmenu)}
                        >
                          User
                        </button>
                      </li>

                      {showSubmenu && (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item text-light ps-4"
                              to="/account/user/login"
                            >
                              User Login
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item text-light ps-4"
                              to="/account/user/register"
                            >
                              User Register
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
