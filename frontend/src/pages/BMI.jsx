import React, { useState } from "react";
import "./BMI.css";

export default function BMI() {

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    let category = "";
    let tips = [];

    if (bmi < 18.5) {
      category = "Underweight";
      tips = [
        "🍌 Eat high calorie foods",
        "🥛 Drink milk & protein",
        "🏋️ Strength training"
      ];
    } 
    else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal";
      tips = [
        "🥗 Maintain balanced diet",
        "🏃 Stay active",
        "💧 Drink water"
      ];
    } 
    else {
      category = "Overweight";
      tips = [
        "🥗 Reduce junk food",
        "🏃 Daily exercise",
        "🚶 Walk 30 mins daily"
      ];
    }

    // 🎯 Age based suggestion
    if (age > 50) {
      tips.push("🧓 Do light exercise & yoga");
    }

    setResult({ bmi, category, tips });
  };

  return (
    <div className="bmi-container">

      <h1>⚖️ BMI Calculator</h1>

      <div className="bmi-box">

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={calculateBMI}>
          Calculate
        </button>

      </div>

      {/* RESULT */}
      {result && (
        <div className={`result-box ${result.category.toLowerCase()}`}>

          <h2>Your BMI: {result.bmi}</h2>
          <h3>{result.category}</h3>

          <ul>
            {result.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}