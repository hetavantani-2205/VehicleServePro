import React from "react";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h2>Driving Excellence in Vehicle Care</h2>
        <p>
          At <strong>VehicleServePro</strong>, we combine cutting-edge technology with 
          automotive expertise to ensure your journey never stops.
        </p>
      </div>

      {/* Stats/Highlights */}
      <div className="about-stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⚡</span>
          <h4>Real-time Tracking</h4>
          <p>Monitor your vehicle's health and service status instantly from your dashboard.</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛡️</span>
          <h4>Secure Locker</h4>
          <p>Keep your RC, Insurance, and PUC documents safe and accessible anywhere.</p>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🛠️</span>
          <h4>Expert Service</h4>
          <p>Connected with the finest service centers to provide top-tier maintenance.</p>
        </div>
      </div>

      {/* Detailed Mission Section */}
      <div className="about-content-section">
        <div className="about-text">
          <h3>Our Mission</h3>
          <p>
            VehicleServePro was born out of a simple idea: making vehicle maintenance 
            as seamless as driving itself. We noticed that owners often struggle with 
            service schedules and paperwork. Our platform solves this by digitizing the 
            entire lifecycle of your vehicle.
          </p>
          <ul className="about-list">
            <li>✅ Automated Service Reminders</li>
            <li>✅ Transparent Health Metrics</li>
            <li>✅ Verified Service Partners</li>
          </ul>
        </div>
        <div className="about-image-placeholder">
           {/* You can replace this with an actual image of a car or a shop */}
           <div className="image-overlay">Since 2026</div>
        </div>
      </div>
    </div>
  );
};

export default About;