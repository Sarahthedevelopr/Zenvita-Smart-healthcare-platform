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

    if (text.includes("cancer")) {
      setMapQuery("cancer hospital in Ranchi");
      return "Here are cancer hospitals near you.";
    }

    if (text.includes("dental")) {
      setMapQuery("dental clinic near me");
      return "Here are dental clinics near you.";
    }

    if (text.includes("doctor")) {
      setMapQuery("doctor near me");
      return "These are doctors available near you.";
    }

    if (text.includes("ambulance")) {
      return "Emergency ambulance number is 108.";
    }

    return "I can help you find hospitals, doctors or emergency services.";

    // 🚑 EMERGENCY
  if (text.includes("ambulance") || text.includes("emergency")) {
    return "🚑 Call 108 immediately for ambulance service.";
  }

  // 🤕 COMMON HEALTH
  if (text.includes("fever")) {
    return "🤒 Take rest, drink fluids and consult a doctor if fever persists.";
  }

  if (text.includes("headache")) {
    return "🧠 Stay hydrated, rest and avoid stress. Consult doctor if severe.";
  }

  if (text.includes("nose bleed") || text.includes("nose se blood")) {
    return "🩸 Sit straight, lean forward and pinch nose for 10 minutes.";
  }

  // 🏥 SERVICES
  if (text.includes("hospital")) {
    setMapQuery("hospital near me");
    return "🏥 Showing nearby hospitals.";
  }

  if (text.includes("doctor")) {
    setMapQuery("doctor near me");
    return "👨‍⚕️ These are doctors available near you.";
  }

  if (text.includes("dental")) {
    setMapQuery("dental clinic near me");
    return "🦷 Here are dental clinics near you.";
  }

  // 💊 MEDICINE
  if (text.includes("medicine") || text.includes("tablet")) {
    return "💊 Please consult a doctor before taking any medication.";
  }

  // ❤️ FALLBACK
  return "🤖 I can help with health tips, doctors, hospitals & emergencies.";

  };

  const sendMessage = () => {
    if (!input) return;

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

      {/* 🤖 AVATAR */}
      <div className={`ai-avatar ${isSpeaking ? "talking" : ""}`}>
        🤖
      </div>

      {/* 💬 CHAT */}
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
          ></iframe>
        )}

      </div>
    </div>
  );
};

export default AI;