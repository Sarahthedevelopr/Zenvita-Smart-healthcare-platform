import React, { useState } from "react";
import "./MentalHealth.css";

export default function MentalHealth() {

  const [mood, setMood] = useState("Happy");
  const [stress, setStress] = useState(50);

  const moods = ["Happy", "Sad", "Angry", "Calm"];

  const handleMood = (m) => {
    setMood(m);

    // 🔥 Dynamic stress
    if (m === "Happy") setStress(20);
    if (m === "Calm") setStress(30);
    if (m === "Sad") setStress(60);
    if (m === "Angry") setStress(80);
  };

  return (
    <div className="mental-container">

      {/* HEADER */}
      <h1>🧠 How are you today?</h1>

      {/* MOOD SELECTOR */}
      <div className="mood-row">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => handleMood(m)}
            className={mood === m ? "active" : ""}
          >
            {m}
          </button>
        ))}
      </div>

      {/* STRESS CARD */}
      <div className="stress-card">
        <h2>{stress}%</h2>
        <p>Your mind needs care & healing 💜</p>
      </div>

      {/* MEDITATION CARDS */}
      <div className="card-grid">

        <div className="med-card">
          <h3>Stress Relief</h3>
          <p>Relax your mind with breathing</p>
          <button>▶ Start</button>
        </div>

        <div className="med-card">
          <h3>Evening Meditation</h3>
          <p>Calm your thoughts before sleep</p>
          <button>▶ Start</button>
        </div>

      </div>

      {/* AFFIRMATION */}
      <div className="affirmation">
        <h3>🌞 Daily Affirmation</h3>
        <p>"You are stronger than you think 💪"</p>
      </div>

      {/* STATS */}
      <div className="stats">
        <h3>Your Mood Stats</h3>

        <div className="bars">
          <div className="bar happy">😃</div>
          <div className="bar sad">😔</div>
          <div className="bar angry">😡</div>
        </div>

      </div>

    </div>
  );
}