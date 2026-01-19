import { useEffect, useState } from "react";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";
import banner_3 from "../assets/banner_3.jpg";

const images = [banner_1, banner_2, banner_3];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      {/* HERO SLIDER */}
      <div className="hero-slider">
        <img src={images[current]} alt="banner" />

        <div className="hero-overlay">
          <h2>Welcome to VehicleServePro</h2>
          <p>Your smart solution for vehicle service, tracking, and management.</p>

          <div className="hero-buttons">
            <button>Book Service</button>
            <button className="outline">View Dashboard</button>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="card">🚗 Manage Vehicles Easily</div>
        <div className="card">📅 Smart Service Booking</div>
        <div className="card">💳 Secure Billing System</div>
        <div className="card">📊 Track History & Reports</div>
      </div>

    </div>
  );
}
