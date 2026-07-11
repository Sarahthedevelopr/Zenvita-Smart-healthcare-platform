import React, { useState } from "react";
import "./AI.css";

const AI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" }
  ]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mapQuery, setMapQuery] = useState("");
  const [typing, setTyping] = useState(false);

  const speak = (text) => {
    if (isMuted) return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const getReply = (msg) => {
    const text = msg.toLowerCase();

    // 🚑 Emergency
    if (text.includes("ambulance") || text.includes("emergency")) {
      return "🚑 Call 108 immediately for ambulance service.";
    }

    // 🏥 Hospitals
    if (text.includes("hospital")) {
      setMapQuery("hospital near me");
      return "🏥 Showing nearby hospitals.";
    }

    if (text.includes("cancer")) {
      setMapQuery("cancer hospital in Ranchi");
      return "Here are cancer hospitals near you.";
    }

    // 👨‍⚕️ Doctors
    if (text.includes("doctor")) {
      setMapQuery("doctor near me");
      return "👨‍⚕️ These are doctors available near you.";
    }

    // 🦷 Dental
    if (text.includes("dental")) {
      setMapQuery("dental clinic near me");
      return "🦷 Here are dental clinics near you.";
    }

    // 🤒 Fever
    if (text.includes("fever")) {
      return "🤒 Take rest, drink plenty of fluids and consult a doctor if fever persists.";
    }

    // 🤕 Headache
    if (text.includes("headache")) {
      return "🧠 Stay hydrated, take proper rest and consult a doctor if the headache is severe.";
    }

    // 🩸 Nose Bleeding
    if (text.includes("nose bleed") || text.includes("nose se blood")) {
      return "🩸 Sit straight, lean forward and pinch your nose gently for 10 minutes.";
    }

    // 💊 Medicine
    if (text.includes("medicine") || text.includes("tablet")) {
      return "💊 Please consult a doctor before taking any medication.";
    }

    // ❤️ Default Reply
    return "🤖 I can help with health tips, doctors, hospitals & emergency services.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setTyping(true);

    const reply = getReply(input);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      speak(reply);
      setTyping(false);
    }, 800);

    setInput("");
  };

  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
    };

    recognition.start();
  };

  return (
    <div className="ai-main-container">
      {/* 🤖 Avatar */}
      <div className={`ai-avatar ${isSpeaking ? "talking" : ""}`}>
        🤖
      </div>

      {/* 💬 Chat */}
      <div className="ai-chat-wrapper">

        <div className="ai-header">
          AI Health Assistant

          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? "🔊" : "🔇"}
          </button>
        </div>

        <div className="ai-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`ai-msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {typing && <div className="ai-typing">Typing...</div>}
        </div>

        <div className="ai-input-area">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />

          <button onClick={sendMessage}>➤</button>

          <button onClick={startVoice}>🎤</button>
        </div>

        {mapQuery && (
          <iframe
            title="map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          />
        )}

      </div>
    </div>
  );
};

export default AI;