import { useEffect, useState } from "react";

export default function Home({ onBookClick, onViewDashboard }) {
  return (
    <div className="home-v2">
      {/* 1. TYPOGRAPHY HERO (No Images) */}
      <header className="minimal-hero">
        <div className="hero-text-stack">
          <span className="platform-tag">VehicleServePro — 2026 Edition</span>
          <h1 className="main-title-clean">
            Precision <span>Automotive</span> Management.
          </h1>
          <p className="hero-description">
            The intelligent hub for your vehicle's lifecycle. Track status, 
            store documents, and manage maintenance with zero friction.
          </p>
          <div className="hero-cta-clean">
            <button className="primary-glass-btn" onClick={onBookClick}>
              Book Service
            </button>
            <button className="secondary-outline-btn" onClick={onViewDashboard}>
              Track Live
            </button>
          </div>
        </div>
      </header>

      {/* 2. BENTO ARCHITECTURE (The main focus now) */}
      <section className="bento-section">
        <div className="container">
          <div className="bento-grid-v2">
            
            {/* Primary Action Card */}
            <div className="bento-card large-card track-card" onClick={onViewDashboard}>
              <div className="card-top">
                <div className="live-indicator">
                  <span className="live-dot"></span>
                  LIVE STATUS
                </div>
              </div>
              <div className="card-body">
                <h3>Vehicle Diagnostics</h3>
                <p>Access real-time health metrics and service progress logs.</p>
              </div>
              <div className="card-footer-icon">📊</div>
            </div>

            {/* Document Card */}
            <div className="bento-card small-card">
              <div className="card-icon">📂</div>
              <h4>Locker</h4>
              <p>Secure cloud storage for RC & Insurance.</p>
            </div>

            {/* Service Card */}
            <div className="bento-card small-card">
              <div className="card-icon">🛠️</div>
              <h4>Network</h4>
              <p>Connect with 15+ verified centers.</p>
            </div>

            {/* Mission Card (Minimalist) */}
            <div className="bento-card wide-card mission-card">
              <div className="mission-content-clean">
                <h3>Our Philosophy</h3>
                <p>Automated maintenance reminders and transparent metrics designed to keep you moving without the headache.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}