import { useEffect, useState } from "react";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";
import banner_3 from "../assets/banner_3.jpg";

const images = [banner_1, banner_2, banner_3];

export default function Home({ onBookClick, onViewDashboard }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-v2">
      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="modern-hero">
        <div className="hero-bg-wrapper">
          <img src={images[current]} alt="banner" className="hero-fade-image" />
          <div className="hero-glass-overlay"></div>
        </div>

        <div className="hero-content-v2">
          <span className="badge">Established 2026</span>
          <h1 className="main-title">
            VehicleServe<span>Pro</span>
          </h1>
          <p className="hero-subtitle">
            Digitizing your vehicle's lifecycle with real-time tracking 
            and expert care.
          </p>
          <div className="hero-cta-group">
            <button className="primary-glass-btn" onClick={onBookClick}>
              Book Service
            </button>
            <button className="secondary-outline-btn" onClick={onViewDashboard}>
              Track Live
            </button>
          </div>
        </div>
      </section>

      {/* 2. BENTO ARCHITECTURE SECTION */}
      <section className="bento-section">
        <div className="container">
          <div className="bento-grid-v2">
            
            {/* Main Feature Tile */}
            <div className="bento-card large-card" onClick={onViewDashboard}>
              <div className="card-header">
                <span className="live-dot"></span>
                <span>Real-time Status</span>
              </div>
              <h3>Monitor Every Move</h3>
              <p>Track your vehicle through service stages instantly.</p>
              <div className="card-icon">⚡</div>
            </div>

            {/* Document Tile */}
            <div className="bento-card small-card">
              <div className="card-icon">🛡️</div>
              <h4>Cloud Locker</h4>
              <p>Secure RC, Insurance & PUC storage.</p>
            </div>

            {/* Expert Tile */}
            <div className="bento-card small-card">
              <div className="card-icon">🛠️</div>
              <h4>Expert Network</h4>
              <p>Finest verified service centers.</p>
            </div>

            {/* Mission Tile (Wide) */}
            <div className="bento-card wide-card">
              <div className="mission-content">
                <h3>Our Mission</h3>
                <p>We make maintenance as seamless as driving itself through automated reminders and transparent health metrics.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. QUICK STATS STRIP */}
      <div className="stats-strip">
        <div className="stat-item"><b>15+</b> Partners</div>
        <div className="stat-item"><b>24/7</b> Support</div>
        <div className="stat-item"><b>100%</b> Digital</div>
      </div>
    </div>
  );
}