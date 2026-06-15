import React, { useState } from "react";
import "./Checkup.css";
import doctorImg from "../assets/doctor2.png";

export default function Checkup() {

  const [step, setStep] = useState(1);
  const [selectedCheckup, setSelectedCheckup] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [address, setAddress] = useState("");

  // 💰 Dynamic Price
  const getPrice = (type) => {
    if (type.includes("Basic")) return 499;
    if (type.includes("Full")) return 999;
    if (type.includes("Heart")) return 1299;
    if (type.includes("Diabetes")) return 799;
    if (type.includes("Thyroid")) return 699;
    return 999;
  };

  const checkups = [
    "Basic Checkup",
    "Full Body Checkup",
    "Heart Checkup",
    "Diabetes",
    "Thyroid"
  ];

  const categories = ["👩 Women", "👨 Men", "🧓 Senior", "🦴 Bone"];

  return (
    <div className="checkup-container">

      <h1>Health Checkup (Test Your Body Now)</h1>

      {/* 🔷 STEP 1 */}
      {step === 1 && (
        <div className="fade">
          <div className="checkup-grid">

            {checkups.map((item, i) => (
              <div
                key={i}
                className="checkup-card"
                onClick={() => {
                  setSelectedCheckup(item);
                  setStep(2);
                }}
              >
                <div className="dots">•••</div>

                <img
                  src={`/images/${["basic","fullbody","heart","diabetes","thyroid"][i]}.png`}
                  alt=""
                  className="card-img"
                />

                <div className="line"></div>

                <h3>{item}</h3>
                <p>Complete health checkup with accurate reports.</p>

                <div className="arrow">➜</div>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* 🔷 STEP 2 */}
      {step === 2 && (
        <div className="fade">

          <h2>{selectedCheckup}</h2>

          <div className="checkup-grid">
            {categories.map((item, i) => (
              <div
                key={i}
                className="checkup-card"
                onClick={() => {
                  setSelectedCategory(item);
                  setStep(3);
                }}
              >
                <h3>{item}</h3>
                <p>Select category what are you looking for?</p>
                <div className="arrow">➜</div>
              </div>
            ))}
          </div>

          <button className="back-btn" onClick={() => setStep(1)}>
            ⬅ Back
          </button>
        </div>
      )}

      {/* 🔷 STEP 3 (🔥 PREMIUM CARD) */}
      {step === 3 && (
        <div className="fade">

          <div className="checkup-detail-box">

            {/* 👨‍⚕️ IMAGE */}
            <div className="checkup-doctor-img">
             <img src={doctorImg} alt="doctor" />
            </div>

            {/* 📋 CONTENT */}
            <div className="checkup-detail-content">

              <h2>{selectedCheckup} - {selectedCategory}</h2>

              <p>🧪 Tests: CBC, Sugar, Thyroid, Cholesterol</p>
              <p>💰 Price: ₹{getPrice(selectedCheckup)}</p>
              <p>🏠 Home Sample Available</p>

              <div className="checkup-actions">
                <button className="btn" onClick={() => setStep(4)}>
                  Continue
                </button>

                <button className="back-btn" onClick={() => setStep(2)}>
                  ⬅ Back
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* 🔷 STEP 4 POPUP */}
      {step === 4 && (
        <div className="popup">
          <div className="popup-box">

            <h2>Enter Address</h2>

            <input
              type="text"
              placeholder="Enter address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              className="btn"
              onClick={() => setStep(5)}
              disabled={!address}
            >
              Confirm Booking 💳
            </button>

            <button
              className="back-btn"
              onClick={() => setStep(3)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* 🔷 STEP 5 SUCCESS */}
      {step === 5 && (
        <div className="success fade">
          <h2>✅ Booking Confirmed</h2>
          <p>Doctor will visit soon 🚑</p>
        </div>
      )}

    </div>
  );
}