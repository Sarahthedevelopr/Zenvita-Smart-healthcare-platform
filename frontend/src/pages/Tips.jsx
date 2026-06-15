import React, { useState, useEffect } from "react";
import "./HealthTips.css";

export default function HealthTips() {

  const [mood, setMood] = useState("Happy");
  const [goal, setGoal] = useState("Fitness");
  const [score, setScore] = useState(0);
  const [expanded, setExpanded] = useState(null);

  // 💧 Water Reminder
  useEffect(() => {
    const interval = setInterval(() => {
      alert("💧 Drink water!");
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // 🎯 Tips Data
  const tipsData = [
    {
      title: "🥗 Diet Tips",
      content: "Eat green vegetables, fruits and balanced diet daily.",
      more: "Include protein, avoid junk, drink 2L water."
    },
    {
      title: "🏃 Exercise",
      content: "Do exercise 30 minutes daily.",
      more: "Walking, running, yoga improves health."
    },
    {
      title: "🧠 Mental Health",
      content: "Stay stress free and calm.",
      more: "Meditation & breathing exercises help."
    }
  ];

  // 🎯 Mood based tip
  const moodTips = {
    Happy: "Keep smiling and stay active 😃",
    Stressed: "Take deep breath & relax 😔",
    Tired: "Take rest and proper sleep 😴"
  };

  // 🎯 Goal based tip
  const goalTips = {
    Fitness: "Stay consistent with workout 💪",
    WeightLoss: "Eat less calories & exercise 🏃",
    MuscleGain: "Eat protein rich food 🥩"
  };

  return (
    <div className="health-container">

      <h1>💚 Health Tips</h1>

      {/* 🎭 Mood */}
      <div className="selector">
        <h3>Select Mood</h3>
        {["Happy", "Stressed", "Tired"].map((m) => (
          <button key={m} onClick={() => setMood(m)}>
            {m}
          </button>
        ))}
      </div>

      {/* 🎯 Goal */}
      <div className="selector">
        <h3>Select Goal</h3>
        {["Fitness", "WeightLoss", "MuscleGain"].map((g) => (
          <button key={g} onClick={() => setGoal(g)}>
            {g}
          </button>
        ))}
      </div>

      {/* 💡 Dynamic Tips */}
      <div className="highlight">
        <p>👉 {moodTips[mood]}</p>
        <p>👉 {goalTips[goal]}</p>
      </div>

      {/* 📊 Score */}
      <div className="score-box">
        <h3>Health Score: {score}</h3>
        <button onClick={() => setScore(score + 10)}>+ Add Healthy Task</button>
      </div>

      {/* 📚 Cards */}
      <div className="tips-grid">
        {tipsData.map((tip, i) => (
          <div
            key={i}
            className="tip-card"
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            <h3>{tip.title}</h3>
            <p>{tip.content}</p>

            {expanded === i && <p className="more">{tip.more}</p>}
          </div>
        ))}
      </div>

    </div>
  );
}