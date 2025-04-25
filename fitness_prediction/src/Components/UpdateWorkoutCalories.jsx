import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import AdminService from '../Services/AdminService';

function UpdateWorkoutCalories() {
  const [workoutData, setWorkoutData] = useState({
    workout_type_id: '',
    intensityid: '',
    duration: '',
    calories_burn: ''
  });
  const { recordid } = useParams();  // Get recordid from URL
  const navigate = useNavigate();
const location=useLocation();

useEffect(() => {
  if (location.state && location.state.record) {
    // Prefill form with passed data
    setWorkoutData(location.state.record);
  } else {
    // fallback: fetch data by recordid from backend if user visits URL directly
    AdminService.updateworkoutcalories(recordid).then((res) => {
      setWorkoutData(res.data);
      // console.log(res.data);
    });
  }
}, [location.state, recordid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.updateworkoutcalories(workoutData,recordid)  // Update via service
      .then(() => {
        navigate('/account/admin/admin-dashboard/workoutcalories/view'); // Navigate back to the list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Workout Calories</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Workout Type</label>
          <input
            type="text"
            className="form-control"
            name="workout_type_id"
            value={workoutData.workout_type_id}
            onChange={handleChange}
            //  readOnly
          />
        </div>
        <div className="form-group">
          <label>Intensity</label>
          <input 
           type="text" 
           className="form-control"  
          name="intensityid" 
          value={workoutData.intensityid} 
          onChange={handleChange}
          // readOnly 
          />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input
           type="text" 
           className="form-control" 
           name="duration" 
           value={workoutData.duration}  
           onChange={handleChange} 
           />
        </div>
        <div className="form-group">
          <label>Calories Burn</label>
          <input  type="text" className="form-control" name="calories_burn" value={workoutData.calories_burn} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}

export default UpdateWorkoutCalories;
