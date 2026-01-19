import { useState } from "react";
import MaintenanceHistory from "./Maintenancehistory";

export default function Services({ openBilling, openvehicle, user, openCenters }) {

  const [activeService, setActiveService] = useState(null);

  return (
    <section id="services">
      <div className="section-content">
        <h2>Our Services</h2>

        <div className="services-grid">

          <div className="service-card" onClick={openvehicle}>
            🚗 Vehicle Management
          </div>

          <div className="service-card">
            📅 Service Booking
          </div>

          {/* ✅ Maintenance clickable */}
          <div
            className="service-card"
            onClick={() => setActiveService("maintenance")}
            style={{ cursor: "pointer" }}
          >
            🛠 Maintenance History
          </div>

          {/* ✅ Billing only for ADMIN */}
          {user?.role === "ADMIN" && (
            <div className="service-card clickable" onClick={openBilling}>
              💳 Billing System
            </div>
          )}

          {/* ✅ Service Centers only for CUSTOMER */}
          {user?.role === "CUSTOMER" && (
            <button onClick={openCenters}>
              Find Nearby Service Centers
            </button>
          )}
        </div>

        {/* ✅ Show maintenance UI only when clicked */}
        {activeService === "maintenance" && (
          <div style={{ marginTop: "30px" }}>
            <MaintenanceHistory />
          </div>
        )}
      </div>
    </section>
  );
}
