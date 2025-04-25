import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import profileicon from "../assets/userprofileicon.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardList, faDumbbell, faFire, faClock, faUser, faSignOut
} from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear(); // Clear stored session/user id
    navigate("/account/user/login");
  };

  const getPageTitle = (pathname) => {
    const parts = pathname.split("/").filter(part => part !== "");
    const dashboardIndex = parts.findIndex(part => part.includes("userdashboard"));
    const relevantParts = dashboardIndex >= 0 ? parts.slice(dashboardIndex + 1) : parts;
    const format = (str) =>
      str
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    return relevantParts.map(format).join(" / ") || "User Dashboard";
  };

  const currentPage = getPageTitle(location.pathname);
  
  const name=localStorage.getItem("name");

  return (
    <div className="admin-container">
      {/* Top Navbar */}
      <div className="admin-navbar d-flex justify-content-between align-items-center px-3 py-2">
        <button className="menu-btn btn btn-sm btn-outline-light" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <div className="admin-info d-flex align-items-center gap-2">
          <a href="#" ><img
            className="rounded-circle"
            src={profileicon}
            alt="user"
            width="40"
            height="40"
          /></a>
          <h5 className="mb-0 text-white">Welcome, {name}</h5>
        </div>
      </div>

      {/* Sidebar + Main */}
      <div className="admin-body d-flex">
        {/* Sidebar */}
        <div className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sidebar-section">
            <div className="sidebar-category">
              <FontAwesomeIcon icon={faDumbbell} className="me-2" />
              <Link to="submit-workout">Submit Workout</Link>
            </div>

            <div className="sidebar-category">
              <FontAwesomeIcon icon={faFire} className="me-2" />
              <Link to="calories-summary">Calories Burned</Link>
            </div>

            <div className="sidebar-category">
              <FontAwesomeIcon icon={faClipboardList} className="me-2" />
              <Link to="workout-history">Workout History</Link>
            </div>

            <div className="sidebar-category">
              <FontAwesomeIcon icon={faClock} className="me-2" />
              <Link to="view-workouts">View Workouts</Link>
            </div>

            <div className="sidebar-category">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <Link to="profile">My Profile</Link>
            </div>

            {/* Add Recommended Plan Link */}
            <div className="sidebar-category">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <Link to="recommend/:userid">Recommended Plan</Link>
            </div>
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

export default UserDashboard;
