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
      </div>

 
  );
}