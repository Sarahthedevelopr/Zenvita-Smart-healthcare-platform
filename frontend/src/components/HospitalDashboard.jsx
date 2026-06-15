import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function HospitalDashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const r = ref(db, "emergency");
    onValue(r, snap => {
      const d = snap.val() || {};
      setData(Object.values(d));
    });
  }, []);

  return (
    <div>
      <h2>Hospital Dashboard</h2>

      {data.map((item, i) => (
        <div key={i}>
          <p>{item.hospital.name}</p>
        </div>
      ))}
    </div>
  );
}