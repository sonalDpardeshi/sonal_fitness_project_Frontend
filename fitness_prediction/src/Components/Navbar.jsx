import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Workouts from "./Workouts"; // Import Workouts Component

const Navbar = ({ userRole }) => {
  const [workouts, setWorkouts] = useState([]);

  // Load workouts from Workouts Component
  useEffect(() => {
    setWorkouts(Workouts()); // Assuming Workouts.jsx returns an array
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold text-light" to="/home">
          Fitness Tracker
        </NavLink>

        {/* Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/home">Home</NavLink>
            </li>

            {/* Workouts Dropdown (Dynamic List) */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                Workouts
              </a>
              <ul className="dropdown-menu">
                {workouts.length > 0 ? (
                  workouts.map((workout, index) => (
                    <li key={index}>
                      <NavLink className="dropdown-item" to={`/workout/${workout.toLowerCase()}`}>
                        {workout}
                      </NavLink>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No workouts available</li>
                )}
              </ul>
            </li>

            {/* Predictions Dropdown (Only for User) */}
            {userRole === "user" && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                  Predictions
                </a>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="/predictions/calories">Calories Burned</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/predictions/workout-plan">Workout Plan</NavLink></li>
                </ul>
              </li>
            )}

            {/* History (Only for User) */}
            {userRole === "user" && (
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/history">History</NavLink>
              </li>
            )}

            {/* Account Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown">
                Account
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/account/admin">Admin</NavLink></li>
                <li><NavLink className="dropdown-item" to="/account/user">User</NavLink></li>
              </ul>
            </li>

            {/* Admin Specific Options */}
            {userRole === "admin" && (
              <>
                <li className="nav-item">
                 <NavLink className="nav-link text-light" to="/users">Users</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/user-history">User History</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
 
export default Navbar;
