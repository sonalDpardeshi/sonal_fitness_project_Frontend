import React, { useState } from 'react';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    height: '',
    weight: ''
  });

  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    height: '',
    weight: ''
  });
  const navigate = useNavigate();

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev, [name]: value
    }));

    // Validate inputs while typing
    validateInput(name, value);
  };

  // Validate input values
  const validateInput = (name, value) => {
    let newErrors = { ...errors };

    // Validate Name: No special characters except spaces
    if (name === 'name' && !/^[A-Za-z\s]+$/.test(value)) {
      newErrors.name = 'Name can only contain alphabets and spaces';
    } else if (name === 'name') {
      newErrors.name = ''; // Clear error if input is valid
    }

    // Validate Email: Must follow email format
    if (name === 'email' && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (name === 'email') {
      newErrors.email = ''; // Clear error if input is valid
    }

    // Validate Height: Must be a number
    if (name === 'height' && !/^\d+$/.test(value)) {
      newErrors.height = 'Height must be a valid number';
    } else if (name === 'height') {
      newErrors.height = ''; // Clear error if input is valid
    }

    // Validate Weight: Must be a number
    if (name === 'weight' && !/^\d+$/.test(value)) {
      newErrors.weight = 'Weight must be a valid number';
    } else if (name === 'weight') {
      newErrors.weight = ''; // Clear error if input is valid
    }

    setErrors(newErrors);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Final validation before submission
    const newErrors = {};
    let isValid = true;

    // Validate Name
    if (!/^[A-Za-z\s]+$/.test(user.name)) {
      newErrors.name = 'Name can only contain alphabets and spaces';
      isValid = false;
    }

    // Validate Email
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate Height
    if (!/^\d+$/.test(user.height)) {
      newErrors.height = 'Height must be a valid number';
      isValid = false;
    }

    // Validate Weight
    if (!/^\d+$/.test(user.weight)) {
      newErrors.weight = 'Weight must be a valid number';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Call register service if validation passes
    UserService.register(user)
      .then((res) => {
        setMsg(res.data);
        navigate('/account/user/login');
      })
      .catch((err) => {
        const errormsg = err.response?.data.message || 'Registration failed';
        setMsg(errormsg);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card shadow-lg border-0"
        style={{ width: "550px", borderRadius: "10px", backgroundColor: "white", padding: "2rem", maxHeight: "90vh", overflowY: "auto" }}>

        <h2 className="text-center fw-bold mb-4" style={{ color: "#333" }}>User Registration</h2>

        {msg && (
          <div className="alert alert-info text-center">{msg}</div>
        )}

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <input type="text" className="form-control p-3 rounded-2" name="name" value={user.name} onChange={handleChange} placeholder="Enter your name" required />
            {errors.name && <div className="text-danger mt-1">{errors.name}</div>}
          </div>

          {/* Email and Password in same row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control p-3 rounded-2" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email" required />
              {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control p-3 rounded-2" name="password" value={user.password} onChange={handleChange} placeholder="Enter password" required />
            </div>
          </div>

          {/* Height and Weight in same row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Height (in cm)</label>
              <input type="text" className="form-control p-3 rounded-2" name="height" value={user.height} onChange={handleChange} placeholder="Enter height" required />
              {errors.height && <div className="text-danger mt-1">{errors.height}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Weight (in kg)</label>
              <input type="text" className="form-control p-3 rounded-2" name="weight" value={user.weight} onChange={handleChange} placeholder="Enter weight" required />
              {errors.weight && <div className="text-danger mt-1">{errors.weight}</div>}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn w-100 p-3 fw-bold"
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
