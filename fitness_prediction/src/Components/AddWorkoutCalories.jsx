import React, { useState, useEffect } from 'react';
import AdminService from '../Services/AdminService';

function AddWorkoutCalories() {
  const [workouts, setWorkouts] = useState([]);
  const [intensities, setIntensities] = useState([]);
  const [formData, setFormData] = useState({
    workout_type_id: '',
    intensityid: '',
    duration: '',
    calories_burn: '',
  });
  const [msg, setMsg] = useState('');

  // Fetch workouts
  useEffect(() => {
    AdminService.viewworkouts()
      .then((res) => setWorkouts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch intensities
  useEffect(() => {
    AdminService.viewintensities()
      .then((res) => setIntensities(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Input handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handler (you can link this with a backend call)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: Call addWorkoutCalories API
    AdminService.addworkoutcalories(formData)
      .then((res) => {
        setMsg("Workout calorie relation added successfully!");
        setFormData({
          workout_type_id: '',
          intensityid: '',
          duration: '',
          calories_burn: '',
        });
      })
      .catch((err) => {
        setMsg("Error adding data.");
        // console.error(err);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-50" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card p-5 shadow-lg border-0" style={{ width: "500px", borderRadius: "10px", backgroundColor: "white" }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>Add Workout Calories</h2>

        {msg && <div className="alert alert-info text-center">{msg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Select Workout</label>
            <select  name="workout_type_id"  className="form-select p-2"  value={formData.workout_type_id} onChange={handleChange} required >
              <option value="">Select a workout</option>
              {workouts.map((e, index) => (
                <option key={index} value={e.workout_type_id}>
                  {e.workout_type_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Select Intensity</label>
            <select
              name="intensityid"  className="form-select p-2"  value={formData.intensityid} onChange={handleChange} required >
              <option value="">Select an intensity</option>
              {intensities.map((e, index) => (
                <option key={index} value={e.intensityid}>
                  {e.intensity_type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Duration (in minutes)</label>
            <input  type="text" name="duration" className="form-control p-2" placeholder="Enter duration" value={formData.duration} onChange={handleChange}  required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Calories Burned</label>
            <input type="text"  name="calories_burn"  className="form-control p-2"  placeholder="Enter calories burned"  value={formData.calories_burn}  onChange={handleChange} required   />
          </div>

          <button  type="submit"  className="btn w-100 p-3 fw-bold"  style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}  onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}  onMouseOut={(e) => (e.target.style.backgroundColor = "#333")} >
            Add Workout Calories
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWorkoutCalories;
