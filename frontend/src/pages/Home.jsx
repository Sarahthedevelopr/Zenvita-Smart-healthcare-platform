import React from "react";
import "./Home.css";
import doctor from "../assets/doctor2.png"; // apna image yaha daalo
import Cards from "../components/Cards"; 

const Home = () => {
  return (
    <>
    <div className="hero">

      {/* LEFT SIDE */}
      <div className="hero-left">
        <h1>
           Jh<span>arkh</span>and Health
        </h1>
        
        <h5>
           Your Our<span> Priority</span> at Your Doorstep<span> Care</span> That Comes to You...
        </h5>
        
        <p>
          Apka trusted healthcare partner jo ghar baithe doctor,
          specially Jharkhand ke liye.
        </p>

        {/* FEATURE CARD */}
        <div className="feature-card">
          <div className="feature">
            <h4>🚑 EMERGENCY LINE</h4>
            <p>📍Live location automatically share</p>
            <p>🚑Fast ambulance dispatch</p>
            <p>👨‍👩‍👧Family ko real-time updates</p>
            
          </div>

          <div className="feature">
            <h4>🏠HOME SERVICE SECTION</h4>
            <p>👨‍⚕️Doctor visit at home</p>
            <p>👨‍⚕️Online consultation (video/audio)</p>
            <p>👨‍⚕️Medicine & test support</p>
            
          </div>

          <div className="feature">
            <h4>🩸Blood Bank</h4>
            <p>Finding Blood Banks</p>
            <p>Provide Location Near You</p>
            <p>Shows Blood Availibility</p>
            <p>Delivery Blood Units</p>
          </div>

          <div className="feature">
            <h4>🏥Jharkhand Hospital </h4>
            <p>Cardiology</p>
            <p>Neurology</p>
            <p>Gynecology</p>
            <p>Orthopedic</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      
      <div className="hero-right">
        
        <div className="doctor-bg"></div>
        <img src={doctor} alt="doctor" />
      </div>

      {/* SEARCH BAR */}
       
       
    </div>

    <Cards/>

     </>  
  );
};

export default Home;