import React, { useState, useEffect } from "react";
import "./Blood.css";

export default function Blood() {

  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("Ranchi");
  const [showResults, setShowResults] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { user: false, text: "Hello 👋 Ask me anything about blood banks" }
  ]);

  const [userLocation, setUserLocation] = useState(null);
  const [banks, setBanks] = useState([]);

  const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

  // 📍 Jharkhand Cities
  const cities = [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Deoghar",
    "Hazaribagh",
    "Giridih",
    "Dumka",
    "Chaibasa"
  ];

  // 📍 Get GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => console.log("Location denied")
    );
  }, []);

  // 🧠 Distance calculate
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  // 🏥 REALISTIC BLOOD BANK DATA
  const bloodBanksData = [
    { name: "RIMS Blood Bank", city: "Ranchi", lat: 23.3441, lng: 85.3096 },
    { name: "Red Cross Blood Bank", city: "Ranchi", lat: 23.37, lng: 85.32 },
    { name: "CCL Hospital Blood Bank", city: "Ranchi", lat: 23.35, lng: 85.31 },

    { name: "Tata Main Hospital", city: "Jamshedpur", lat: 22.8046, lng: 86.2029 },
    { name: "MGM Hospital", city: "Jamshedpur", lat: 22.79, lng: 86.2 },

    { name: "PMCH Blood Bank", city: "Dhanbad", lat: 23.7957, lng: 86.4304 },

    { name: "Bokaro General Hospital", city: "Bokaro", lat: 23.6693, lng: 86.1511 },

    { name: "Deoghar Sadar Hospital", city: "Deoghar", lat: 24.48, lng: 86.7 },

    { name: "Hazaribagh Hospital", city: "Hazaribagh", lat: 23.9966, lng: 85.3691 },

    { name: "Giridih Blood Bank", city: "Giridih", lat: 24.18, lng: 86.3 },

    { name: "Dumka Blood Bank", city: "Dumka", lat: 24.27, lng: 87.25 },

    { name: "Chaibasa Blood Bank", city: "Chaibasa", lat: 22.55, lng: 85.8 }
  ];

  // 🔥 SEARCH FUNCTION
  const handleSearch = () => {
    if (!bloodGroup) return alert("Select Blood Group");

    const filtered = bloodBanksData
      .filter((b) => b.city === city)
      .map((b) => {
        const units = Math.floor(Math.random() * 10) + 1;

        return {
          ...b,
          units,
          distance: userLocation
            ? getDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
            : "N/A",
          phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`
        };
      });

    setBanks(filtered);
    setShowResults(true);
  };

  const handleCall = (num) => {
    alert(`📞 Calling: ${num}`);
  };

  const openMap = (name) => {
    window.open(
      `https://www.google.com/maps/search/${name}+${city}`,
      "_blank"
    );
  };

  // 🔴 LOW STOCK COLOR
  const getStockClass = (units) => {
    if (units < 3) return "low";
    if (units < 6) return "medium";
    return "high";
  };

  // 💬 CHAT
  const sendMessage = (text) => {
    if (!text) return;

    setMessages(prev => [...prev, { user: true, text }]);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          user: false,
          text: "📍 Showing nearby blood banks based on your need"
        }
      ]);
    }, 600);
  };

  return (
    <div className="blood-main">

      <h1>🩸 Blood Finder</h1>

      {/* BLOOD SELECT */}
      <div className="blood-row">
        {bloodGroups.map((g, i) => (
          <div
            key={i}
            className={`blood-pill ${bloodGroup === g ? "active" : ""}`}
            onClick={() => setBloodGroup(g)}
          >
            {g}
          </div>
        ))}
      </div>

      {/* 🔽 CITY DROPDOWN */}
      <div className="search-row">

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <button onClick={handleSearch}>
          🚑 Find Blood
        </button>

      </div>

      {/* RESULTS */}
      {showResults && (
        <>
          <h2>Blood Banks</h2>

          <div className="bank-grid">
            {banks.map((b, i) => (
              <div key={i} className="bank-box">

                <h3>{b.name}</h3>
                <p>{b.city}</p>

                <p>📍 {b.distance} km</p>

                {/* 🩸 STOCK */}
                <p className={getStockClass(b.units)}>
                  🩸 {b.units} units
                </p>

                <div className="btn-row">
                  <button onClick={() => handleCall(b.phone)}>Call</button>
                  <button onClick={() => openMap(b.name)}>Map</button>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {/* CHAT BUTTON */}
      <div className="chat-top" onClick={() => setChatOpen(!chatOpen)}>
        🤖
      </div>

      {/* CHATBOX */}
      {chatOpen && (
        <div className="chat-box">

          <div className="chat-header">AI Assistant</div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={m.user ? "user-msg" : "bot-msg"}>
                {m.text}
              </div>
            ))}
          </div>

          <input
            placeholder="Ask anything..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />

        </div>
      )}

    </div>
  );
}