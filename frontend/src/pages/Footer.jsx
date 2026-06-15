import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ultra-footer">

      {/* 🌊 ANIMATED WAVE */}
      <div className="wave">
        <svg viewBox="0 0 1440 200">
          <path
            fill="url(#grad)"
            d="M0,100 C300,200 900,0 1440,100 L1440,0 L0,0 Z"
          ></path>
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🔷 MAIN CONTENT */}
      <div className="ultra-container">

        {/* 🔷 BRAND */}
        <div className="ultra-box">
          <h2>Zenvita<span>Health</span></h2>
          <p>
            Smart healthcare platform to connect patients with doctors instantly.
          </p>

          <div className="social-icons">
            <i>🌐</i>
            <i>📘</i>
            <i>🐦</i>
            <i>💼</i>
          </div>
        </div>

        {/* 🔷 LINKS */}
        <div className="ultra-box">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>Hospitals</p>
          <p>Doctors</p>
          <p>Appointments</p>
        </div>

        {/* 🔷 SERVICES */}
        <div className="ultra-box">
          <h3>Services</h3>
          <p>Doctor at Home</p>
          <p>Health Checkup</p>
          <p>Emergency</p>
          <p>AI Assistant</p>
        </div>

        {/* 🔷 NEWSLETTER */}
        <div className="ultra-box">
          <h3>Subscribe</h3>
          <p>Get health tips & updates</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>➜</button>
          </div>
        </div>

      </div>

      {/* 🔷 BOTTOM */}
      <div className="ultra-bottom">
        © 2026 Zenvita Health • All Rights Reserved
      </div>

    </footer>
  );
}