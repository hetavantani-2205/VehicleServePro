import { useState } from "react";
import MaintenanceHistory from "./Maintenancehistory";

export default function Services({ openBilling, openvehicle, user, openCenters }) {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="services-bento-section">
      <div className="container">
        {!activeService ? (
          <>
            <div className="section-header-v2">
              <span className="platform-tag">Ecosystem</span>
              <h2 className="main-title-clean">Our <span>Services</span></h2>
            </div>

            <div className="bento-grid-v2">
              {/* 1. Vehicle Management - Large Card */}
              <div className="bento-card large-card service-highlight" onClick={openvehicle}>
                <div className="card-icon">🚗</div>
                <div className="card-body">
                  <h3>Vehicle Management</h3>
                  <p>Comprehensive tracking of your fleet diagnostics, health metrics, and real-time status updates.</p>
                </div>
                <button className="primary-glass-btn">Open Fleet</button>
              </div>

              {/* 2. Maintenance History - Feature Card */}
              <div 
                className="bento-card" 
                onClick={() => setActiveService("maintenance")}
              >
                <div className="card-icon">🛠️</div>
                <h4>Maintenance History</h4>
                <p>View past service records and upcoming schedules.</p>
              </div>

              {/* 3. Nearby Centers - Role Check */}
              {(user?.role === "CUSTOMER" || user?.role === "ADMIN") && (
                <div className="bento-card" onClick={openCenters}>
                  <div className="card-icon">📍</div>
                  <h4>Service Centers</h4>
                  <p>Locate verified VSP partner hubs near you.</p>
                </div>
              )}

              {/* 4. Billing - ADMIN Only - Wide Card */}
              {user?.role?.toUpperCase() === "ADMIN" && (
                <div className="bento-card wide-card admin-special" onClick={openBilling}>
                  <div className="card-content-flex">
                    <div>
                      <div className="ai-badge">Admin Access</div>
                      <h4>Billing System</h4>
                      <p>Manage invoices, transactions, and financial reporting.</p>
                    </div>
                    <div className="card-icon">💳</div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
        
          <div className="sub-service-view">
            <button 
              className="secondary-outline-btn back-btn"
              onClick={() => setActiveService(null)}
            >
              ← Back to Overview
            </button>
            <div className="maintenance-wrapper">
               {activeService === "maintenance" && <MaintenanceHistory />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}