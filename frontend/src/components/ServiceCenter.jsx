import { useState } from "react";

function ServiceCenters() {
  const [city, setCity] = useState("Vadodara");
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity);
    }
  };

  return (
    <section style={{ padding: "40px 20px" }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        background: "white",
        padding: "25px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ color: "#0a3d62", marginBottom: "10px" }}>
          Nearby Service Centers
        </h2>

        <p style={{ marginBottom: "20px", color: "#555" }}>
          Currently showing results for: <strong>{city}</strong>
        </p>

        {/* Search box */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter city name (e.g. Mumbai, Delhi)"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              padding: "12px 20px",
              background: "#0a3d62",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Search
          </button>
        </div>

        {/* Map Container */}
        <div className="map-container" style={{ height: "450px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
          <iframe
            key={city}
            title="Google Maps"
            src={`https://maps.google.com/maps?q=vehicle%20service%20center%20in%20${encodeURIComponent(city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default ServiceCenters;