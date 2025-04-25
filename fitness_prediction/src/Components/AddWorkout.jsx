import React, { useState } from 'react';
import AdminService from '../Services/AdminService';

function AddWorkout() {
  const [workout, setWorkout] = useState({ workout_type_name: "" });
  const [msg, setMsg] = useState("");

  // Input change handler
  const handleChange = (e) => {
    setWorkout(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call add workout API (you must create this in AdminService and your backend)
    AdminService.addworkout(workout)
      .then((res) => {
        setMsg("Workout added successfully!");
        setWorkout({ workout_type_name: "" }); // Reset form
      })
      .catch((err) => {
        setMsg("Error adding workout.");
        console.error(err);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-50" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card p-5 shadow-lg border-0" style={{ width: "500px", borderRadius: "10px", backgroundColor: "white" }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>Add New Workout</h2>

        {/* Display message */}
        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Workout Name</label>
            <input
              type="text"
              name="workout_type_name"
              className="form-control p-3 rounded-2"
              placeholder="Enter workout name (e.g., Running)"
              value={workout.workout_type_name}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 p-3 fw-bold"
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
          >
            Add Workout
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWorkout;
