import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

function UpdateUserProfile({ profile, setShowUpdateForm, setProfile, getUserProfile }) {
  const [updatedProfile, setUpdatedProfile] = useState({
    userid: profile.userid, // Assuming the userid is part of the profile
    name: profile.name,
    email: profile.email,
    password: profile.password,
    height: profile.height,
    weight: profile.weight,
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can extend this validation as needed)
    if (!updatedProfile.name || !updatedProfile.email || !updatedProfile.password) {
      alert('Please fill out all required fields');
      return;
    }

    // Call the API to update the profile
    UserService.updateprofile(updatedProfile, updatedProfile.userid)
      .then((response) => {
        setMsg('Profile updated successfully!');
        setShowUpdateForm(false); // Close the update form
        setProfile(updatedProfile); // Update the profile in the parent component
        
        // Refetch the profile data to ensure the view has the latest info
        getUserProfile(updatedProfile.userid);

        // Optionally navigate to another page (e.g., to the profile page)
        navigate('/account/user/profile');
      })
      .catch((error) => {
        const errormsg = error.response?.data.message || 'Failed to update profile';
        setMsg(errormsg);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-75" style={{ backgroundColor: "#f8f8f8" }}>
      <div className=" border-0"
        style={{ width: "550px", borderRadius: "10px", backgroundColor: "white", padding: "2rem", maxHeight: "90vh"}}>
        
        <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>Update Your Profile</h2>

        {msg && (
          <div className="alert alert-info text-center">{msg}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control p-3 rounded-2"
              name="name"
              value={updatedProfile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email and Password in the same row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control p-3 rounded-2"
                name="email"
                value={updatedProfile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="form-control p-3 rounded-2"
                name="password"
                value={updatedProfile.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          {/* Height and Weight in the same row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Height (in cm)</label>
              <input
                type="text"
                className="form-control p-3 rounded-2"
                name="height"
                value={updatedProfile.height}
                onChange={handleChange}
                placeholder="Enter height"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Weight (in kg)</label>
              <input
                type="text"
                className="form-control p-3 rounded-2"
                name="weight"
                value={updatedProfile.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 p-3 fw-bold"
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
          >
            Save Changes
          </button>
        </form>

        <button
          type="button"
          className="btn btn-secondary w-100 mt-2"
          onClick={() => setShowUpdateForm(false)}
          style={{ borderRadius: "8px", transition: "0.3s" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateUserProfile;
