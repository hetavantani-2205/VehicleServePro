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
      {/* HERO SECTION - KEPT AS IS */}
      <div className="hero-slider">
        <img src={images[current]} alt="banner" />

        <div className="hero-overlay">
          <h2>Welcome to VehicleServePro</h2>
          <p>Your smart solution for vehicle service, tracking, and management.</p>

          <div className="hero-buttons">
            <button onClick={onBookClick}>Book Service</button>
            <button className="outline" onClick={onViewDashboard}>
              Track Service
            </button>
          </div>
        </div>
      </div>

      {/* INTEGRATED ABOUT SECTION CONTENT */}
      <div className="about-container" style={{ marginTop: '100px', padding: '60px 20px' }}>
        
        {/* Driving Excellence Section */}
        <div className="about-hero" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ color: '#0a3d62', fontSize: '2.5rem' }}>Driving Excellence in Vehicle Care</h2>
          <p style={{ maxWidth: '800px', margin: '20px auto', color: '#555', fontSize: '1.1rem' }}>
            At <strong>VehicleServePro</strong>, we combine cutting-edge technology with 
            automotive expertise to ensure your journey never stops.
          </p>
        </div>

        {/* Stats/Highlights Grid */}
        <div className="about-stats-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px', 
            maxWidth: '1200px', 
            margin: '0 auto 60px' 
        }}>
          <div className="stat-card" style={cardStyle}>
            <span style={{ fontSize: '2rem' }}>⚡</span>
            <h4 style={{ color: '#0a3d62', margin: '15px 0' }}>Real-time Tracking</h4>
            <p>Monitor your vehicle's health and service status instantly from your dashboard.</p>
          </div>
          <div className="stat-card" style={cardStyle}>
            <span style={{ fontSize: '2rem' }}>🛡️</span>
            <h4 style={{ color: '#0a3d62', margin: '15px 0' }}>Secure Locker</h4>
            <p>Keep your RC, Insurance, and PUC documents safe and accessible anywhere.</p>
          </div>
          <div className="stat-card" style={cardStyle}>
            <span style={{ fontSize: '2rem' }}>🛠️</span>
            <h4 style={{ color: '#0a3d62', margin: '15px 0' }}>Expert Service</h4>
            <p>Connected with the finest service centers to provide top-tier maintenance.</p>
          </div>
        </div>

        {/* Detailed Mission Section */}
        <div className="about-content-section" style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '50px', 
            maxWidth: '1200px', 
            margin: '0 auto', 
            alignItems: 'center' 
        }}>
          <div className="about-text" style={{ flex: '1', minWidth: '300px' }}>
            <h3 style={{ color: '#0a3d62', fontSize: '2rem', marginBottom: '20px' }}>Our Mission</h3>
            <p style={{ lineHeight: '1.6', color: '#444', marginBottom: '20px' }}>
              VehicleServePro was born out of a simple idea: making vehicle maintenance 
              as seamless as driving itself. We noticed that owners often struggle with 
              service schedules and paperwork. Our platform solves this by digitizing the 
              entire lifecycle of your vehicle.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}>✅ Automated Service Reminders</li>
              <li style={{ marginBottom: '10px' }}>✅ Transparent Health Metrics</li>
              <li style={{ marginBottom: '10px' }}>✅ Verified Service Partners</li>
            </ul>
          </div>
          
          <div className="about-image-placeholder" style={{ 
              flex: '1', 
              minWidth: '300px', 
              height: '300px', 
              background: '#0a3d62', 
              borderRadius: '15px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              color: 'white'
          }}>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>VehicleServePro</div>
             <div style={{ 
                 position: 'absolute', 
                 bottom: '20px', 
                 right: '20px', 
                 background: '#27ae60', 
                 padding: '5px 15px', 
                 borderRadius: '20px' 
             }}>Since 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
    textAlign: 'center',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    background: '#f8f9fa',
    borderBottom: '4px solid #0a3d62'
};