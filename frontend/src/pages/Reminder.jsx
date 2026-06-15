import React, { useState, useEffect } from "react";
import "./MedicineReminder.css";

export default function MedicineReminder() {

  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState("After Food");

  // ➕ Add Medicine
  const addMedicine = () => {
    if (!name || !time) return;

    const newMed = {
      id: Date.now(),
      name,
      time,
      food,
      taken: false
    };

    setMedicines([...medicines, newMed]);
    setName("");
    setTime("");
  };

  // ✅ Mark as taken
  const markTaken = (id) => {
    const updated = medicines.map(m =>
      m.id === id ? { ...m, taken: true } : m
    );
    setMedicines(updated);
  };

  // 🔔 Simple Reminder (every 30 sec check)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      medicines.forEach(m => {
        if (m.time === now && !m.taken) {
          alert(`💊 Time to take ${m.name}`);
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [medicines]);

  return (
    <div className="med-container">

      {/* HEADER */}
      <h1>💊 Medicine Reminder</h1>

      {/* ADD FORM */}
      <div className="add-box">
        <input
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <select value={food} onChange={(e) => setFood(e.target.value)}>
          <option>After Food</option>
          <option>Before Food</option>
        </select>

        <button onClick={addMedicine}>➕ Add</button>
      </div>

      {/* LIST */}
      <div className="med-grid">

        {medicines.length === 0 && <p>No medicines added</p>}

        {medicines.map(m => (
          <div key={m.id} className={`med-card ${m.taken ? "taken" : ""}`}>

            <h3>{m.name}</h3>
            <p>⏰ {m.time}</p>
            <p>🍽 {m.food}</p>

            <button
              onClick={() => markTaken(m.id)}
              disabled={m.taken}
            >
              {m.taken ? "✅ Taken" : "Take Now"}
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}