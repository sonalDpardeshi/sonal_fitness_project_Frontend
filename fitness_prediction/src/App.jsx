import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home"
import AdminLogin from "./Components/AdminLogin";

function App() {
  const [userRole, setUserRole] = useState("user"); // "admin" or "user"

  return (
  <>
   
    <BrowserRouter>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/predictions/calories" element={<h1>Calories Burned</h1>} />
        <Route path="/predictions/workout-plan" element={<h1>Workout Plan</h1>} />
        <Route path="/history" element={<h1>History</h1>} />
        <Route path="/account/admin" element={<AdminLogin/>} />
        <Route path="/account/user" element={<h1>User Panel</h1>} />
        <Route path="/users" element={<h1>Users</h1>} />
        <Route path="/users/register" element={<h1>Users register</h1>} />
        <Route path="/users/login" element={<h1>Users login</h1>} />
        <Route path="/user-history" element={<h1>User History</h1>} />
      </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
