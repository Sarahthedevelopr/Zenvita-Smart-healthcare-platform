import React, { useState, useEffect } from "react";
import "./DoctorHome.css";
import generalImg from "../assets/dashboard.jpg";
import dentistImg from "../assets/dental Hopital.jpg";
import entImg from "../assets/ENTspecial.webp";
import childImg from "../assets/childspecial.jpg";
import gynoImg from "../assets/gynecologist.jpg";
import emergencyImg from "../assets/emergency.webp";
import doc1 from "../assets/doctor1.avif";
import doc6 from "../assets/doctor6.avif";
import doc8 from "../assets/doctor4.avif";
import doc11 from "../assets/doctor11.avif";
import doc2 from "../assets/doctor2.png";
import doc3 from "../assets/doctor111.jpg";
import doc9 from "../assets/doctor9.jpg";
import doc7 from "../assets/doctor3.jpg";
import doc5 from "../assets/doctor5.jpg";
import doc4 from "../assets/doctor1111.webp";
import doc10 from "../assets/doctor10.webp";
import doc12 from "../assets/doctor12.jpg";



export default function DoctorHome() {

  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState("Detecting...");
  const [voiceText, setVoiceText] = useState("");

  // ✅ Updated Services with Images
  const services = [
   { name: "General Doctor", img: generalImg },
  { name: "Dentist", img: dentistImg },
  { name: "ENT Specialist", img: entImg },
  { name: "Child Specialist", img: childImg },
  { name: "Gynecologist", img: gynoImg },
  { name: "Emergency", img: emergencyImg }
  ];

  // 🧠 AI Suggestion
  const handleAISuggestion = (text) => {
    if (text.includes("tooth")) return setSelectedService("Dentist");
    if (text.includes("ear")) return setSelectedService("ENT Specialist");
    if (text.includes("baby")) return setSelectedService("Child Specialist");
    if (text.includes("emergency")) return setSelectedService("Emergency");
    setSelectedService("General Doctor");
  };

  // 🎤 Voice Input
  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      setVoiceText(text);
      handleAISuggestion(text);
    };
    recognition.start();
  };

  // 📍 Location Detect
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(
          `Lat: ${pos.coords.latitude.toFixed(2)}, Lng: ${pos.coords.longitude.toFixed(2)}`
        );
      },
      () => setLocation("Location denied")
    );
  }, []);

  // 🚑 Tracking Animation
  useEffect(() => {
    if (tracking) {
      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
    }
  }, [tracking]);

  // 👨‍⚕️ Doctors
  const doctorImages = [
  doc1,
  doc2,
  doc3,
  doc4,
  doc5,
  doc6,
  doc7,
  doc8,
  doc9,
  doc10,
  doc11,
  doc12
];

const doctors = Array.from({ length: 12 }, (_, i) => ({
  name: `Dr. ${["Sharma","Khan","Mehta","Verma","Singh","Rao","Gupta","Das","Ali","Roy","Patel","Sen"][i]}`,
  rating: (4 + Math.random()).toFixed(1),
  fee: 300 + i * 50,
  status: i % 3 === 0 ? "Busy" : "Available",
  img: doctorImages[i % doctorImages.length]   // 🔥 IMPORTANT
}));

  const filteredDoctors = doctors;

  return (
    <div className="doc-container">

      <h1>Doctor Home Service 🏠</h1>

      {/* 📍 LOCATION */}
      <p className="location">📍 {location}</p>

      {/* 🎤 VOICE */}
      <button className="voice-btn" onClick={startVoice}>
        🎤 Speak
      </button>

      {voiceText && <p className="voice-text">🧠 You said: {voiceText}</p>}

      {/* 🔷 SERVICES */}
      <div className="doc-service-grid">
        {services.map((item, i) => (
          <div
            key={i}
            className={`doc-service-card ${i % 2 === 0 ? "up" : "down"}`}
            onClick={() => setSelectedService(item.name)}
          >
            <div className="service-img">
              <img src={item.img} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>

      {/* 👨‍⚕️ DOCTORS */}
      {selectedService && (
        <div className="doctor-section">
          <h2>{selectedService}</h2>

          <div className="doc-grid">
            {filteredDoctors.map((doc, i) => (
              <div key={i} className="doc-card">

                <img src={doc.img} alt="doctor" />

                <h3>{doc.name}</h3>
                <p>⭐ {doc.rating}</p>
                <p>💰 ₹{doc.fee}</p>

                <p className={doc.status === "Available" ? "green" : "red"}>
                  {doc.status}
                </p>

                <button
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setShowPopup(true);
                  }}
                >
                  Book Now
                </button>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* 📅 BOOK POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-box">

            <h2>Confirm Booking</h2>
            <p>{selectedDoctor?.name}</p>
            <p>₹{selectedDoctor?.fee}</p>

            <button
              className="confirm-btn"
              onClick={() => {
                setShowPopup(false);
                setConfirmPopup(true);
              }}
            >
              Confirm
            </button>

            <button onClick={() => setShowPopup(false)}>
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* ✅ SUCCESS */}
      {confirmPopup && (
        <div className="popup">
          <div className="popup-box success">

            <h2>✅ Doctor On The Way 🚑</h2>

            <button
              onClick={() => {
                setConfirmPopup(false);
                setTracking(true);
              }}
            >
              Track Doctor
            </button>

          </div>
        </div>
      )}

      {/* 🚑 TRACKING */}
      {tracking && (
        <div className="tracking-box">

          <h2>🚑 Live Tracking</h2>

          <div className="progress-bar">
            <div style={{ width: `${progress}%` }}></div>
          </div>

          <p>{progress}% Reached</p>

        </div>
      )}

    </div>
  );
}