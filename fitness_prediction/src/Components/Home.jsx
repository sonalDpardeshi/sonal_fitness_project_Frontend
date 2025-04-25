import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import videobg from "../assets/vbg.mp4";
import WorkoutSlider from "./WorkoutSlider";
import BlogSection from "./BlogSection";
import AboutUs from "./AboutUs";
import logo from "../assets/logoicon.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faInstagram,faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'


function Home() {
  return (
    <>
      <header className="video-header my-2">
        {/* Background Video */}
        <video autoPlay loop muted className="bg-video">
          <source src={videobg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Text with ID for Home link */}
        <div id="home" className="overlay d-flex align-items-center justify-content-center text-center">
          <div className="content">
            <h1 className="display-4 fw-bold text-gradient">
              Welcome to Our <br /> Personalized Fitness Prediction System
            </h1>
            <p className="fs-3 fw-light text-white quote">
              "Push yourself, because no one else is going to do it for you."
            </p>
            <p className="fs-3 fw-bold text-warning quote quote-delay">
              "Your only limit is you. Keep moving forward."
            </p>
          </div>
        </div>
      </header>

      <div id="about" className="redirect">
        <AboutUs />
      </div>

      <div id="workouts" className="redirect">
        <WorkoutSlider />
      </div>

      <div id="blog" className="redirect">
        <BlogSection />
      </div>

      <footer className="myfooter">
        <div className="container-fluid bg-dark text-light py-5">
          {/* Top Line */}
          <h5 className="text-center mb-3">Stay fit. Stay focused. Stay strong.</h5>
          <hr style={{ width: "300px", borderTop: "2px solid #f8f9fa", margin: "auto" }} />

          {/* Project Logo & Name */}
          <div className="text-center my-3">
            <img src={logo} alt="Logo" className="me-2 logoimg" />
            <span className="fs-4 fw-bold">Personalized Fitness Prediction System</span>
          </div>

          {/* Navigation Links */}
          <div className="d-flex justify-content-center flex-wrap mb-3">
            <a href="#home" className="text-light mx-3 text-decoration-none">Home</a>
            <a href="#about" className="text-light mx-3 text-decoration-none">About Us</a>
            <a href="#workouts" className="text-light mx-3 text-decoration-none">Workouts</a>
            <a href="#blog" className="text-light mx-3 text-decoration-none">Blog</a>
          </div>

          {/* Social Media Icons */}
          <div className="d-flex justify-content-center mb-4 ">
              <FontAwesomeIcon className="text-light mx-3" icon={faFacebook}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faInstagram}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faTwitter}></FontAwesomeIcon>
              <FontAwesomeIcon className="text-light mx-3" icon={faLinkedin}></FontAwesomeIcon>
          </div>

          {/* Footer Bottom */}
          <p className="text-center mb-0">&copy; 2025 Personalized Fitness Prediction System. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
