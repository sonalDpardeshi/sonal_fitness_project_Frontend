import React from 'react'
import img from "../assets/aboutusbg.jpg"
function AboutUs() {
  return (
    <>
    <h1 className='text-center'>About Us</h1>
    <div className='w-100 aboutusbg text-light container border-2 border-danger'>

    {/* <img className="img-fluid" src={img} alt="About us bg image" /> */}
   <h2 className=''> Personalized Fitness Prediction System</h2>
   <p className=''>Track Better. Train Smarter.</p>
   <ul className=''>
<li>
 Log Your Workouts with Ease (CSV-based)</li>
 <li> Predict Calories Burned with ML</li>
 <li> Get Personalized Workout Suggestions (KNN)</li>
 <li> User-Friendly Interface with Admin Control</li>
 <li>Export Workout History Anytime</li>
 </ul>
    START YOUR FITNESS JOURNEY
 
    </div>
    </>
  )
}

export default AboutUs