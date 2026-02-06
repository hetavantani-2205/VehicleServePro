import { useState } from "react";
import MaintenanceHistory from "./Maintenancehistory";

export default function Services({ openBilling, openvehicle, user, openCenters }) {
  const [activeService, setActiveService] = useState(null);

  // Debugging: Keep this to see why buttons might hide
  console.log("Services received user role:", user?.role);

  return (
    <section id="services">
      <div className="section-content">
        <h2>Our Services</h2>

        {/* Show Grid only if no sub-service is active */}
        {!activeService ? (
          <div className="services-grid">
            <div className="service-card" onClick={openvehicle}>
              🚗 Vehicle Management
            </div>

            <div
              className="service-card"
              onClick={() => setActiveService("maintenance")}
            >
              🛠 Maintenance History
            </div>

            {/* Role Check: ADMIN */}
            {user?.role?.toUpperCase() === "ADMIN" && (
              <div className="service-card" onClick={openBilling}>
                💳 Billing System
              </div>
            )}

            {/* Role Check: CUSTOMER */}
             {(user?.role === "CUSTOMER" || user?.role === "ADMIN") && (
     <div className="service-card" onClick={openCenters}>
    📍 Find Nearby Service Centers
  </div>
  )}
    </div>
           
 ) : (
          /* Maintenance View */
          <div style={{ marginTop: "20px" }}>
            <button 
              onClick={() => setActiveService(null)}
              style={{ marginBottom: "15px", background: "#666", color: "white" }}
            >
              ← Back to Services
            </button>
            {activeService === "maintenance" && <MaintenanceHistory />}
          </div>
        )}
      </div>
    </section>
  );
}