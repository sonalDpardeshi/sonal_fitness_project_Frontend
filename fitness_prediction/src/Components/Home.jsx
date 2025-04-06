import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./style.css"; // Import additional styles
import WorkoutSlider from './WorkoutSlider';

function Home() {
  return (<>
    <WorkoutSlider/>
    <div className="container-fluid home-container d-flex align-items-center justify-content-center">
      <div className="text-center">
        {/* Title with Bootstrap Styling */}
        <h1 className="display-4 fw-bold text-gradient">
          Welcome to Our <br /> Personalized Fitness Prediction System
        </h1>

        {/* Animated Quotes */}
        <p className="fs-3 fw-light text-white quote">
          "Push yourself, because no one else is going to do it for you."
        </p>
        <p className="fs-3 fw-bold text-warning quote">
          "Your only limit is you. Keep moving forward."
        </p>
      </div>
    </div>
    </>
  );
}

export default Home;
