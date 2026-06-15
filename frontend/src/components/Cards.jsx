import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

const cards = [
  { title: "Hospitals", icon: "🏥", path: "/hospitals" },
  { title: "Doctor Home Service", icon: "👨‍⚕️", path: "/doctors" },
  { title: "Symptom Checker", icon: "🩺", path: "/symptoms" },
  { title: "Emergency", icon: "🚑", path: "/emergency" },
  { title: "Blood", icon: "🩸", path: "/blood" },
  { title: "Medicine Reminder", icon: "💊", path: "/reminder" },
  { title: "Health Tips", icon: "🌿", path: "/tips" },
  { title: "BMI Calculator", icon: "⚖️", path: "/bmi" },
  { title: "Full Body Checkup", icon: "📅", path: "/appointment" },
  { title: "Mental Health", icon: "🧠", path: "/mental" }
];

function Cards() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = cards.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="cards-container">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search health services..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🧠 CARDS */}
      <div className="cards-grid">
        {filtered.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(item.path)}   // ✅ Navigation
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {/* 🤖 AI CARD */}
      <div className="ai-card" onClick={() => navigate("/ai")}>
        <h2>🤖 Clear Your Doubt</h2>
        <p>Ask anything • Voice + Chat AI</p>
      </div>

    </div>
  );
}

export default Cards;