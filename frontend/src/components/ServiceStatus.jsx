import React from "react";

export default function ServiceStatus({ vehicles }) {

  if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
    return (
      <div className="status-empty">
        <h3>No active bookings found.</h3>
        <p>Please book a service to track your vehicle.</p>
      </div>
    );
  }

  return (
    <div className="status-wrapper">
      <h2 className="status-title">Track Your Service</h2>

      <div className="status-grid">
        {vehicles.map((booking) => {

          const progress =
            booking.status === "COMPLETED"
              ? 100
              : booking.status === "IN PROGRESS"
              ? 60
              : 25;

          return (
            <div key={booking.id} className="status-card">

              <div className="status-header">
                <div>
                  <h2>{booking.carName || "Vehicle"}</h2>
                  <p className="car-number">{booking.carNumber}</p>
                </div>
                <span className={`badge ${booking.status.replace(" ", "")}`}>
                  {booking.status}
                </span>
              </div>

              <p><strong>Name:</strong> {booking.name}</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <p className="progress-text">
                Progress: {progress}%
              </p>

            </div>
          );
        })}
      </div>

      <p className="status-note">
        Status is based on your latest service records.
      </p>
    </div>
  );
}