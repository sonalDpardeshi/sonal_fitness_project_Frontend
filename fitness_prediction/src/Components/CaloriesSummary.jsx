import React, { useState, useEffect } from 'react';
import UserService from '../Services/UserService';

function CaloriesSummary() {
  const [calories, setCalories] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  let userid = localStorage.getItem("userid");

  useEffect(() => {
    if (!userid) {
      setErrorMsg("User is not logged in.");
      return;
    }
    UserService.viewcaloriesburn(userid)
      .then((res) => {
        setCalories(res.data);
        setErrorMsg(''); // Reset error message if the API call is successful
      })
      .catch((err) => {
        setErrorMsg("Failed to fetch calories burned. Please try again later.");
        console.error(err); // Log error for debugging
      });
  }, [userid]);

  return (
    <>
      <div className='text-center fs-3 mb-4'><strong>Calories Summary</strong></div>
      
      <div className='container mt-4 d-flex align-items-center justify-content-center'>
        {errorMsg ? (
          <div className="alert alert-danger">{errorMsg}</div>
        ) : (
          <h2 className='box p-2'>Total calories burned up till now: {calories}</h2>
        )}
      </div>
    </>
  );
}

export default CaloriesSummary;
