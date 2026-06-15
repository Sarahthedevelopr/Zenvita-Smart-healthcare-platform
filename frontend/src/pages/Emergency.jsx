import React, { useState } from "react";
import "./Emergency.css";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export default function Emergency() {

  const [location, setLocation] = useState(null);
  const [tracking, setTracking] = useState(false);
  const userId = "user123";

  // 🔥 TRACK LOCATION
  const startTracking = () => {
    setTracking(true);

    navigator.geolocation.watchPosition(
      (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLocation({ lat, lng });

        set(ref(db, "tracking/" + userId), {
          lat,
          lng,
          time: Date.now()
        });

      },
      () => alert("Location permission allow karo"),
      { enableHighAccuracy: true }
    );
  };

  // 🚨 SOS
  const handleSOS = () => {
    startTracking();
    alert("🚑 Emergency Activated!");
  };

  // 📞 CALL
  const callAmbulance = () => {
    window.location.href = "tel:108";
  };

  // 📍 SHARE
  const shareLocation = () => {
    const link = `${window.location.origin}/track/${userId}`;
    window.open(`https://wa.me/?text=🚨 Track me live: ${link}`);
  };

  return (
    <div className="emergency-page">

      <h1>🚨 Emergency Help</h1>

      {/* SOS BUTTON */}
      <div className="sos-wrapper" onClick={handleSOS}>
        <div className="sos-btn">SOS</div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-row">
        <button onClick={callAmbulance}>🚑 Ambulance</button>
        <button onClick={shareLocation}>📍 Share</button>
      </div>

      {/* STATUS */}
      {tracking && <p className="status">Live tracking started...</p>}

      {/* MAP */}
      {location && (
        <iframe
          title="map"
          src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
          className="map"
        ></iframe>
      )}

    </div>
  );
}