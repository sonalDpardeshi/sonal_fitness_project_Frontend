import React, { useState } from 'react';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Call login service
    UserService.login(user)
      .then((res) => {
        setMsg(res.data.msg); // success message

        // This happens after the user successfully logs in
if (res.data.userid) {
  localStorage.setItem("userid", res.data.userid);//Store the userid
  localStorage.setItem("username", res.data.username);  // Store the username (or email)
  localStorage.setItem("name",res.data.name);//stores name of user
}


        // You can  navigate to user dashboard 
        navigate("/account/user/UserDashboard",{state:{"name":res.data.name}});
      })
      .catch((err) => {
        setMsg(err.response?.data || "Login failed");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100"
         style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card p-5 shadow-lg border-0"
           style={{ width: "500px", borderRadius: "10px", backgroundColor: "white" }}>
        <h2 className="text-center fw-bold mb-3" style={{ color: "#333" }}>User Login</h2>

        {/* Show error/success message */}
        {msg && (
          <div className="alert alert-info text-center">{msg}</div>
        )}

        <form onSubmit={handleLogin}>
          {/* Username Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input  type="text" className="form-control p-3 rounded-2" name="email"  value={user.email} onChange={handleChange}  placeholder="Enter user username"  required  />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input  type="password"  className="form-control p-3 rounded-2"  name="password"  value={user.password}  onChange={handleChange}  placeholder="Enter user password"  required/>
          </div>

          {/* Submit Button */}
          <button  type="submit" className="btn w-100 p-3 fw-bold" style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }} onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")} >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
