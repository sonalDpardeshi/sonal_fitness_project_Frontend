import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import profileicon from "../assets/profileicon.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers,faFire,faFireFlameSimple,
  faDumbbell, faPersonRunning, faUser, faPersonWalking, faSignOut
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [workoutMenuOpen, setWorkoutMenuOpen] = useState(false);
  const [calorieMenuOpen, setCalorieMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear session or token here if needed
    navigate("/account/admin");
  };

  const getPageTitle = (pathname) => {
    const parts = pathname.split("/").filter(part => part !== "");
    const adminIndex = parts.findIndex(part => part.includes("admin-dashboard"));
    const relevantParts = adminIndex >= 0 ? parts.slice(adminIndex + 1) : parts;

    const format = (str) =>
      str
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return relevantParts.map(format).join(" / ") || "Dashboard";
  };

  const currentPage = getPageTitle(location.pathname);

  return (
    <div className="admin-container">
      {/* Top Navbar */}
      <div className="admin-navbar d-flex justify-content-between align-items-center px-3 py-2">
        <button className="menu-btn btn btn-sm btn-outline-light" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <div className="admin-info d-flex align-items-center gap-2">
          <img
            className="profileiconimg"
            // src="https://www.w3schools.com/howto/img_avatar.png"
            src={profileicon}
            alt="admin"
            width="40"
            height="40"
          />
          <h5 className="mb-0 text-white">Welcome, Admin</h5>
        </div>
      </div>

      {/* Sidebar and Main Content */}
      <div className="admin-body d-flex">
        {/* Sidebar */}
        <div className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          {/* User Menu */}
          <div className="sidebar-section">
            <div className="sidebar-category" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Users {userMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${userMenuOpen ? "open" : ""}`}>
              <li>
                <Link to="users/view">
                  <FontAwesomeIcon icon={faUsers} className="me-2" />
                  View Users
                </Link>
              </li>
            </ul>
          </div>

          <hr className="sidebar-divider" />

          {/* Workout Menu */}
          <div className="sidebar-section">
            <div className="sidebar-category" onClick={() => setWorkoutMenuOpen(!workoutMenuOpen)}>
              <FontAwesomeIcon icon={faPersonWalking} className="me-2" />
              Workouts {workoutMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${workoutMenuOpen ? "open" : ""}`}>
              <li>
                <Link to="workouts/add">
                  <FontAwesomeIcon icon={faDumbbell} className="me-2" />
                  Add Workout
                </Link>
              </li>
              <li>
                <Link to="workouts/view">
                  <FontAwesomeIcon icon={faPersonRunning} className="me-2" />
                  View Workouts
                </Link>
              </li>
            </ul>
          </div>

          <hr className="sidebar-divider" />

          {/* Calorie Menu */}
          <div className="sidebar-section">
            <div className="sidebar-category" onClick={() => setCalorieMenuOpen(!calorieMenuOpen)}>
              <FontAwesomeIcon icon={faFire} className="me-2" />
              Calories {calorieMenuOpen ? "▾" : "▸"}
            </div>
            <ul className={`submenu ${calorieMenuOpen ? "open" : ""}`}>
              <li>
                <Link to="workoutcalories/add">
                  <FontAwesomeIcon icon={faFireFlameSimple} className="me-2" />
                  Add Calorie Data
                </Link>
              </li>
              <li>
                <Link to="workoutcalories/view">
                  <FontAwesomeIcon icon={faFire} className="me-2" />
                  View Calorie Logs
                </Link>
              </li>
            </ul>
          </div>

          <hr className="sidebar-divider" />

          {/* Logout */}
          <div className="sidebar-category logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut} className="me-2" />
            Logout
          </div>
        </div>

        {/* Main Content */}
        <div className={`admin-content ${sidebarOpen ? "shifted" : ""}`}>
          <div className="page-title text-end">
            <p>{currentPage}</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
