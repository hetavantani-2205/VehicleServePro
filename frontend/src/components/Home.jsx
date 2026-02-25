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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero-slider">
        <img src={images[current]} alt="banner" className="hero-image" />

        <div className="hero-overlay">
          <div className="hero-content">
            <h1>VehicleServePro</h1>
            <p>
              Smart vehicle service, tracking and lifecycle management —
              built for modern mobility.
            </p>

            <div className="hero-buttons">
              <button className="book-btn-small" onClick={onBookClick}>
                Book Service
              </button>
              <button className="outline-btn" onClick={onViewDashboard}>
                Track Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">

          <div className="about-hero">
            <h2 className="gradient-text">
              Driving Excellence in Vehicle Care
            </h2>
            <p className="subtitle">
              At <strong>VehicleServePro</strong>, we combine cutting-edge
              technology with automotive expertise to ensure your journey
              never stops.
            </p>
          </div>

          {/* SERVICES GRID */}
          <div className="services-grid">
            <div className="service-card">
              <span className="icon-main">⚡</span>
              <h4>Real-time Tracking</h4>
              <p>
                Monitor your vehicle's health and service status instantly
                from your dashboard.
              </p>
            </div>

            <div className="service-card">
              <span className="icon-main">🛡️</span>
              <h4>Secure Locker</h4>
              <p>
                Keep your RC, Insurance, and PUC documents safe and
                accessible anywhere.
              </p>
            </div>

            <div className="service-card">
              <span className="icon-main">🛠️</span>
              <h4>Expert Service</h4>
              <p>
                Connected with the finest service centers to provide
                top-tier maintenance.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission-section">
        <div className="container mission-layout">

          <div className="mission-left">
            <h2>Our Mission</h2>

            <p>
              VehicleServePro was born out of a simple idea — making
              vehicle maintenance as seamless as driving itself.
              We digitize the entire lifecycle of your vehicle.
            </p>

            <ul className="mission-list">
              <li>Automated Service Reminders</li>
              <li>Transparent Health Metrics</li>
              <li>Verified Service Partners</li>
            </ul>

            <div className="mission-meta">
              Established 2026 • VehicleServePro
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}