import React, { useEffect, useState } from 'react';
import UserService from '../Services/UserService'; // adjust the path as needed
import UpdateUserProfile from './UpdateUserProfile'; // Import the UpdateProfile component

function ViewUserProfile() {
  const [profile, setProfile] = useState({});
  const [msg, setMsg] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state to control the form visibility

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    if (userid) {
      UserService.viewprofile(userid)
        .then(res => {
          setProfile(res.data[0]); // Access the first element of the array
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
          setMsg("Failed to load profile. Please try again.");
        });
    } else {
      setMsg("User ID not found in localStorage.");
    }
  }, [userid]);

  // Handle showing the update profile form
  const handleUpdateClick = () => {
    setShowUpdateForm(true); // Toggle the state to show the UpdateProfile component
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-75">
      <div className="card p-3 shadow-sm" style={{ width: "500px", borderRadius: "10px", backgroundColor: "white", padding: "2rem" }}>
        <h2 className="text-center mb-3">Your Profile</h2>

        {msg && <p className="text-danger text-center">{msg}</p>}

        {!showUpdateForm ? (
          <div className="text-center">
            {/* <p><strong>User ID:</strong> {userid}</p> */}
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Password:</strong> {profile.password}</p>
            <p><strong>Height:</strong> {profile.height} cm</p>
            <p><strong>Weight:</strong> {profile.weight} kg</p>

            <button className="btn btn-primary mt-3" onClick={handleUpdateClick}>
              Update Profile
            </button>
          </div>
        ) : (
          <UpdateUserProfile profile={profile} setShowUpdateForm={setShowUpdateForm} />
        )}
      </div>
    </div>
  );
}

export default ViewUserProfile;
