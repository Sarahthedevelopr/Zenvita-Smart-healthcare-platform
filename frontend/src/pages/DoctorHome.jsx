import React, { useState } from "react";
import "./DoctorHome.css";

const doctorsData = [
  {
    name: "Dr. Sharma",
    type: "General",
    status: "Available",
    eta: "30 mins",
    rating: 4.5,
    fees: "₹300"
  },
  {
    name: "Dr. Mehta",
    type: "Dental",
    status: "Busy",
    eta: "1 hour",
    rating: 4.2,
    fees: "₹500"
  },
  {
    name: "Dr. Khan",
    type: "Emergency",
    status: "Available",
    eta: "20 mins",
    rating: 4.7,
    fees: "₹700"
  },
  {
    name: "Nurse Anjali",
    type: "Nurse",
    status: "Available",
    eta: "40 mins",
    rating: 4.3,
    fees: "₹200"
  }
];

export default function DoctorHome() {
  const [filter, setFilter] = useState("All");
  const [mapQuery, setMapQuery] = useState("");

  const filteredDoctors =
    filter === "All"
      ? doctorsData
      : doctorsData.filter((doc) => doc.type === filter);

  const handleCall = (name) => {
    alert(`Calling ${name}...`);
  };

  const handleLocation = (name) => {
    setMapQuery("doctor near me");
    alert(`Location shared with ${name}`);
  };

  return (
    <div className="doctor-container">

      <h1>🏥 Doctor at Home</h1>
      <p>Get medical help at your doorstep</p>

      {/* FILTERS */}
      <div className="filters">
        {["All", "General", "Dental", "Emergency", "Nurse"].map((item) => (
          <button key={item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      {/* DOCTOR CARDS */}
      <div className="doctor-list">
        {filteredDoctors.map((doc, i) => (
          <div key={i} className="doctor-card">

            <h3>{doc.name}</h3>
            <p>{doc.type}</p>

            <span className={doc.status === "Available" ? "status green" : "status red"}>
              {doc.status}
            </span>

            <p>⏱️ {doc.eta}</p>
            <p>⭐ {doc.rating}</p>
            <p>💰 {doc.fees}</p>

            <div className="actions">
              <button onClick={() => handleCall(doc.name)}>📞 Call</button>
              <button onClick={() => handleLocation(doc.name)}>📍 Location</button>
            </div>

          </div>
        ))}
      </div>

      {/* MAP */}
      {mapQuery && (
        <iframe
          title="map"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        ></iframe>
      )}

    </div>
  );
}