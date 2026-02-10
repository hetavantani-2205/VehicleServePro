import { useEffect, useState } from "react";

export default function ServiceStatus({ vehicles }) {

  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={{ padding: "40px" }}>
        <h3>No active bookings found.</h3>
        <p>Please book a service to track your vehicle.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Track Your Service</h2>
      <div className="status-grid" style={{ display: "grid", gap: "20px" }}>
        {vehicles.map((booking) => (
          <div key={booking.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
            <p><strong>Name:</strong> {booking.name}</p>
            <p><strong>Car:</strong> {booking.carNumber}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ 
                color: booking.status === "COMPLETED" ? "green" : "blue", 
                fontWeight: "bold" 
              }}>
                {booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "20px", color: "#666", fontSize: "14px" }}>
        Status is based on your latest records.
      </p>
    </div>
  );
}