import React, { useState } from "react";
import "./Hospital.css";

// ✅ IMPORT IMAGES
import img1 from "../assets/Apollo Clinic.webp";
import img2 from "../assets/Guru Nanak Hospital.jpg";
import img3 from "../assets/Devkamal Hospital.jpg";
import img4 from "../assets/Sadar Hospital.jpg";
import img5 from "../assets/SamFord Hospital.webp";
import img6 from "../assets/Shree Jagannath Hospital.webp";
import img7 from "../assets/Sparsh Hospital.jpg";
import img8 from "../assets/special hospital.webp";
import img9 from "../assets/Rani Hospital.png";
import img10 from "../assets/Santevita Hospital.jpg";
import img11 from "../assets/dental Hopital.jpg";
import img12 from "../assets/Guru Kripa Hospital.jpg";


export default function Hospital() {

  const [city, setCity] = useState("Ranchi");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const cities = ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Hazaribagh"];
  const categories = ["Dental","ENT","Cardiology","Neurology","Pediatrics","Gynecology","Orthopedic","General"];

  // ✅ IMAGE ARRAY
  const hospitalImages = [img1, img2, img3,img4, img5, img6,img7, img8, img9, img10,img11,img12];

  // 🔥 DATA GENERATOR
  const generateHospitals = () => {
    const data = [];

    cities.forEach((city) => {
      categories.forEach((type) => {
        for (let i = 1; i <= 8; i++) {
          data.push({
            name: `${city} ${type} Care Center ${i}`,
            city,
            type,
            rating: (Math.random() * 1 + 4).toFixed(1),
            distance: (Math.random() * 5 + 1).toFixed(1) + " km",
            open: Math.random() > 0.3 ? "Open" : "Closed",
            phone: "98" + Math.floor(10000000 + Math.random() * 90000000),
            img: hospitalImages[i % hospitalImages.length]   // ✅ IMAGE ADD
          });
        }
      });
    });

    return data;
  };

  const allHospitals = generateHospitals();

  // 🔍 SEARCH
  const handleSearch = () => {
    const filtered = allHospitals.filter(
      (h) =>
        h.city === city &&
        (category ? h.type === category : true)
    );

    setResults(filtered);
    setSearched(true);
  };

  // 📞 CALL
  const handleCall = (num) => {
    alert(`📞 Calling: ${num}`);
  };

  // 🗺️ MAP
  const handleMap = (name) => {
    window.open(`https://www.google.com/maps/search/${name}+${city}`, "_blank");
  };

  // 📅 BOOK
  const handleBook = (hospital) => {
    setSelectedHospital(hospital);
    setShowPopup(true);
  };

  return (
    <div className="hospital-main">

      <h1>🏥 Find Hospitals</h1>

      {/* FILTER */}
      <div className="filter-row">

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c,i)=><option key={i}>{c}</option>)}
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Category</option>
          {categories.map((c,i)=><option key={i}>{c}</option>)}
        </select>

        <button onClick={handleSearch}>🔍 Search</button>

      </div>

      {/* 🤖 AI TEXT */}
      {category && searched && (
        <p className="ai-text">
          🤖 Best {category} hospitals in {city}
        </p>
      )}

      {/* 🏥 DEFAULT UI */}
      {!searched && (
        <div className="default-section">

          <h2>🏥 Popular Hospitals</h2>

          <div className="hospital-grid">
            {allHospitals.slice(0, 8).map((h, i) => (
              <div key={i} className="hospital-box">

                <div className="hospital-img">
                  <img src={h.img} alt="hospital" />
                </div>

                <h3>{h.name}</h3>
                <p>📍 {h.city}</p>
                <p>⭐ {h.rating}</p>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 🔍 SEARCH RESULTS */}
      {searched && (
        <div className="hospital-grid">

          {results.length > 0 ? (
            results.map((h,i)=>(
              <div key={i} className="hospital-box">

                <div className="hospital-img">
                  <img src={h.img} alt="hospital" />
                </div>

                <h3>{h.name}</h3>
                <p>📍 {h.city} • {h.distance}</p>
                <p>🧠 {h.type}</p>
                <p>⭐ {h.rating}</p>
                <p className={h.open === "Open" ? "open" : "closed"}>
                  {h.open}
                </p>

                <div className="hospital-btns">
                  <button onClick={()=>handleCall(h.phone)}>📞 Call</button>
                  <button onClick={()=>handleMap(h.name)}>🗺️ Map</button>
                  <button onClick={()=>handleBook(h)}>📅 Book</button>
                </div>

              </div>
            ))
          ) : (
            <p className="no-data">No hospitals found</p>
          )}

        </div>
      )}

      {/* 📅 POPUP */}
      {showPopup && !bookingDone && (
        <div className="popup">
          <div className="popup-box">
            <h3>Confirm Booking</h3>
            <p>{selectedHospital?.name}</p>

            <button
              className="confirm-btn"
              onClick={() => setBookingDone(true)}
            >
              Confirm
            </button>

            <button onClick={()=>setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS */}
      {bookingDone && (
        <div className="popup">
          <div className="popup-box success">
            <h3>✅ Booking Successful</h3>
            <p>Appointment Confirmed</p>

            <button onClick={()=>{
              setShowPopup(false);
              setBookingDone(false);
            }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}