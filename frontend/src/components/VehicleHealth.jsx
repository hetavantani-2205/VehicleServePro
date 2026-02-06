import React from "react";

const VehicleHealth = ({ oil, tire, battery }) => {
  
  const oilLevel = oil || 0;
  const tireLevel = tire || 0;
  const batteryLevel = battery || 0;


  const getColor = (value) => {
    if (value < 30) return "#e74c3c"; // Red for Danger
    if (value < 60) return "#f1c40f"; // Yellow for Warning
    return "#2ecc71"; // Green for Healthy
  };

  return (
    <div className="health-card-content">
      <div className="health-stats-grid">
        
        {/* Engine Oil Metric */}
        <div className="health-stat-item">
          <div 
            className="progress-circle" 
            style={{ 
              "--value": oilLevel, 
              "--color": getColor(oilLevel) 
            }}
          >
            <span className="percentage">{oilLevel}%</span>
          </div>
          <p className="stat-label">Engine Oil</p>
        </div>

        {/* Tire Condition Metric */}
        <div className="health-stat-item">
          <div 
            className="progress-circle" 
            style={{ 
              "--value": tireLevel, 
              "--color": getColor(tireLevel) 
            }}
          >
            <span className="percentage">{tireLevel}%</span>
          </div>
          <p className="stat-label">Tire Life</p>
        </div>

        {/* Battery Health Metric */}
        <div className="health-stat-item">
          <div 
            className="progress-circle" 
            style={{ 
              "--value": batteryLevel, 
              "--color": getColor(batteryLevel) 
            }}
          >
            <span className="percentage">{batteryLevel}%</span>
          </div>
          <p className="stat-label">Battery</p>
        </div>

      </div>

      {/* Dynamic Alert Message */}
      {(oilLevel < 40 || tireLevel < 40 || batteryLevel < 40) && (
        <div className="health-alert-box">
          ⚠️ <strong>Attention:</strong> Some components require immediate maintenance.
        </div>
      )}
    </div>
  );
};

export default VehicleHealth;