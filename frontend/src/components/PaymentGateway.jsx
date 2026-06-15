import React, { useState } from "react";
import "./Payment.css";

export default function PaymentGateway({ amount, onClose }) {

  const [method, setMethod] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    if (!method) return alert("Select payment method");

    setTimeout(() => {
      setSuccess(true);
    }, 800);
  };

  return (
    <div className="payment-overlay">

      <div className="payment-box">

        {!success ? (
          <>
            <h2>💳 Payment Gateway</h2>

            <p className="amount">Amount: ₹{amount}</p>

            <div className="methods">
              {["UPI", "Card", "Net Banking", "Cash"].map((m) => (
                <div
                  key={m}
                  className={`method ${method === m ? "active" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  {m}
                </div>
              ))}
            </div>

            <button className="pay-btn" onClick={handlePay}>
              Pay Now
            </button>

            <button className="close-btn" onClick={onClose}>
              Cancel
            </button>
          </>
        ) : (
          <div className="success">
            <h2>✅ Payment Successful</h2>
            <button onClick={onClose}>Done</button>
          </div>
        )}

      </div>
    </div>
  );
}