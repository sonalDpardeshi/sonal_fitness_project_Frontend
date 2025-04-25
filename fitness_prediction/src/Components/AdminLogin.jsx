import React, { useState } from 'react';
import AdminService from '../Services/AdminService';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    AdminService.login(admin)
      .then((res) => {
        setMsg(res.data.msg); // Set success message
        // Directly navigate — no need to store anything
        navigate("/account/admin/admin-dashboard");
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.msg || "Login failed";
        setMsg(errorMsg);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100"
         style={{ backgroundColor: "#f8f8f8" }}>
      <div className="card p-5 shadow-lg border-0"
           style={{ width: "500px", borderRadius: "10px", backgroundColor: "white" }}>
        <h2 className="text-center fw-bold mb-3" style={{ color: "#333" }}>Admin Login</h2>

        {msg && (
          <div className="alert alert-info text-center">{msg}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input type="text" className="form-control p-3 rounded-2"
                   name="username" value={admin.username} onChange={handleChange}
                   placeholder="Enter admin username" required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input type="password" className="form-control p-3 rounded-2"
                   name="password" value={admin.password} onChange={handleChange}
                   placeholder="Enter admin password" required />
          </div>

          <button
            type="submit"
            className="btn w-100 p-3 fw-bold"
            style={{ borderRadius: "8px", backgroundColor: "#333", color: "white", transition: "0.3s" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#555")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#333")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
