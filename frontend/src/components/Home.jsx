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
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <section className="hero">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === current ? "active" : ""}`}
          >
            <img src={img} alt="Vehicle banner" />
          </div>
        ))}

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>
            Experience <span>Precision</span> Care
          </h1>
          <p>
            Smart vehicle service, real-time tracking, and seamless
            digital maintenance — engineered for the road ahead.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={onBookClick}>
              Book Service
            </button>
            <button className="secondary-btn" onClick={onViewDashboard}>
              Track Vehicle
            </button>
          </div>
        </div>

        <div className="hero-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Driving Excellence</h2>
        <p className="features-subtitle">
          Cutting-edge technology meets automotive expertise.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">⚡</div>
            <h3>Real-time Tracking</h3>
            <p>
              Monitor your vehicle's health and service status instantly
              from your personalized dashboard.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🛡️</div>
            <h3>Secure Locker</h3>
            <p>
              Keep your RC, Insurance and documents safe in our encrypted
              cloud vault.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🛠️</div>
            <h3>Expert Service</h3>
            <p>
              Connected with verified top-tier service centers to give your
              vehicle the care it deserves.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission">
        <div className="mission-text">
          <h4>OUR MISSION</h4>
          <h2>Making maintenance as seamless as driving.</h2>
          <p>
            VehicleServePro digitizes the entire automotive lifecycle.
            No paper trails. No guesswork. Just clarity, automation,
            and control.
          </p>

          <ul>
            <li>Automated Reminders</li>
            <li>Transparent Metrics</li>
            <li>Verified Partners</li>
            <li>Cloud Storage</li>
          </ul>
        </div>

        <div className="mission-card">
          <h3>VehicleServePro</h3>
          <span>Established 2026</span>
        </div>
      </section>

    </div>
  );
}