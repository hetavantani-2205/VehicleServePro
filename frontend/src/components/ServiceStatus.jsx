import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function ServiceStatus({ vehicles }) {
  const [liveVehicles, setLiveVehicles] = useState(vehicles || []);

  
  useEffect(() => {
    setLiveVehicles(vehicles || []);
  }, [vehicles]);


  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user?.email;

      client.subscribe(`/topic/status/${email}`, (message) => {
        const updatedBooking = JSON.parse(message.body);

        setLiveVehicles((prev) =>
          prev.map((b) =>
            b.id === updatedBooking.id ? updatedBooking : b
          )
        );
      });
    };

    client.activate();

    return () => client.deactivate();
  }, []);

  if (!liveVehicles || liveVehicles.length === 0) {
    return (
      <div className="status-empty-v2">
        <div className="bento-card">
          <div className="card-icon">🔍</div>
          <h3>No active bookings found.</h3>
          <p>Your active service lifecycle will appear here once booked.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-page-wrapper">
      <div className="section-header-v2">
        <span className="platform-tag">Live Monitor</span>
        <h2 className="main-title-clean">
          Service <span>Lifecycle</span>
        </h2>
      </div>

      <div className="status-bento-grid">
        {liveVehicles.map((booking) => {
          const progress =
            booking.status === "COMPLETED"
              ? 100
              : booking.status === "IN PROGRESS"
              ? 60
              : 25;

          return (
            <div key={booking.id} className="status-card-v2">
              <div className="status-header-v2">
                <div className="vehicle-info">
                  <h3>{booking.carName || "Vehicle"}</h3>
                  <span className="plate-pill">{booking.carNumber}</span>
                </div>

                <div
                  className={`status-badge-v2 ${booking.status
                    .replace(" ", "-")
                    .toLowerCase()}`}
                >
                  <span className="dot"></span>
                  {booking.status}
                </div>
              </div>

              <div className="status-body">
                <p className="owner-label">
                  Registered to: <strong>{booking.name}</strong>
                </p>

                <div className="progress-container-v2">
                  <div className="progress-labels">
                    <span>Diagnostic</span>
                    <span>Repair</span>
                    <span>Ready</span>
                  </div>

                  <div className="progress-bar-v2">
                    <div
                      className="progress-fill-v2 animated"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="glow-tip"></div>
                    </div>

                    {/* 🚗 CAR ANIMATION */}
                    <div
                      className="car-move"
                      style={{ left: `${progress}%` }}
                    >
                      🚗
                    </div>
                  </div>

                  <p className="progress-percentage">
                    {progress}% Optimized
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="status-footer-note">
        <span className="live-dot"></span> Live tracking enabled
      </p>
    </div>
  );
}