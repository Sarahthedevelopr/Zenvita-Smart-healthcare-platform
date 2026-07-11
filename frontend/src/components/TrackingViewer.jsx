import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { useParams } from "react-router-dom";

export default function TrackingViewer() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const trackingRef = ref(db, "emergency/" + id);

    const unsubscribe = onValue(trackingRef, (snapshot) => {
      setData(snapshot.val());
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <div className="tracking">
      <h2>🚑 Live Tracking</h2>

      {data && (
        <>
          <p>Status: {data.status}</p>

          {/* 🧭 USER MAP */}
          <iframe
            title="map"
            src={`https://www.google.com/maps?q=${data.userLat},${data.userLng}&output=embed`}
            className="map"
          />

          {/* 🚑 AMBULANCE MAP */}
          <iframe
            title="map2"
            src={`https://www.google.com/maps?q=${data.ambLat},${data.ambLng}&output=embed`}
            className="map"
          />
        </>
      )}
    </div>
  );
}