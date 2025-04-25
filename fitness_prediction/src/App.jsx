import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AdminLogin from "./Components/AdminLogin";
import UserLogin from "./Components/UserLogin";
import AdminDashboard from "./Components/AdminDashboard";
import UserDashboard from "./Components/UserDashboard";
import UserRegister from "./Components/UserRegister";
import SubmitWorkout from "./Components/SubmitWorkout";
import CaloriesSummary from "./Components/CaloriesSummary";
import UserWorkoutHistory from "./Components/UserWorkoutHistory";
import ViewWorkouts from "./Components/ViewWorkouts";
import ViewUserProfile from "./Components/ViewUserProfile";
import AddWorkout from "./Components/AddWorkout";
import AddWorkoutCalories from "./Components/AddWorkoutCalories";
import ViewWorkoutCalories from "./Components/ViewWorkoutCalories";
import UpdateWorkoutCalories from "./Components/UpdateWorkoutCalories";
import ViewUsers from "./Components/ViewUsers";
import RecommendPlan from "./Components/RecommendPlan";
// import "./style.css"; 


// Wrapper to conditionally hide Navbar
function AppWrapper({ userRole }) {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/account/admin/admin-dashboard") ||
                     location.pathname.startsWith("/account/user/UserDashboard");

  return (
    <>
      {!hideNavbar && <Navbar userRole={userRole} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<ViewWorkouts/>} />
        <Route path="/account" element={<h1>Account</h1>} />

        {/* Admin Routes */}
        <Route path="/account/admin" element={<AdminLogin />} />
        <Route path="/account/admin/admin-dashboard/" element={<AdminDashboard />}>
          {/* Nested AdminDashboard Routes (relative paths!) */}
          <Route path="workouts/add" element={<AddWorkout />} />
          <Route path="workouts/view" element={<ViewWorkouts />} />

          <Route path="workoutcalories/add" element={<AddWorkoutCalories />} />
          <Route path="workoutcalories/view" element={<ViewWorkoutCalories />} />

          <Route path="/account/admin/admin-dashboard/workoutcalories/update/:recordid" element={<UpdateWorkoutCalories />} />
          
          <Route path="users/view" element={<ViewUsers />} />
          
        </Route>

        {/* User Routes */}
        <Route path="/account/user/register" element={<UserRegister />} />
        <Route path="/account/user/login" element={<UserLogin />} />
        <Route path="/account/user/userDashboard" element={<UserDashboard />}>
          <Route path="submit-workout" element={<SubmitWorkout />} />
          <Route path="calories-summary" element={<CaloriesSummary />} />
          <Route path="workout-history" element={<UserWorkoutHistory />} />
          <Route path="view-workouts" element={<ViewWorkouts />} />
          <Route path="profile" element={<ViewUserProfile />} />
          <Route path="recommend/:userid" element={<RecommendPlan />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  const [userRole, setUserRole] = useState("user");

  return (
    <BrowserRouter>
      <AppWrapper userRole={userRole} />
    </BrowserRouter>
  );
}

export default App;
