import { useState, useEffect } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import Dashboard from "./components/Vehicle";
import Contact from "./components/Contact";
import Billing from "./components/Billing";
import Login from "./components/Login";
import Register from "./components/Register";
import ServiceCenters from "./components/ServiceCenter";
import ServiceBooking from "./components/ServiceBooking";
import ServiceStatus from "./components/ServiceStatus";
import Feedback from "./components/Feedback";
import VehicleHealth from "./components/VehicleHealth";
import DocumentLocker from "./components/DocumentLocker";

const normalizeRole = (role) => {
  if (!role) return "CUSTOMER";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("MECHANIC")) return "MECHANIC";
  if (r.includes("CUSTOMER")) return "CUSTOMER";
  return "CUSTOMER";
};

function App() {
  // --- SESSION SECURITY CHECK ---
  // This helper clears storage and resets state
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
    setIsLoggedIn(false);
    setUser({ role: "CUSTOMER" });
    setPage("login");
  };

  // --- INITIAL STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    const timestamp = localStorage.getItem("loginTimestamp");
    const currentTime = new Date().getTime();
    const SESSION_LIMIT = 24 * 60 * 60 * 1000; // 24 Hours

    
    if (status && timestamp && (currentTime - timestamp > SESSION_LIMIT)) {
      localStorage.clear();
      return false;
    }
    return status;
  });

  const [page, setPage] = useState(isLoggedIn ? "home" : "login");

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !isLoggedIn) return { role: "CUSTOMER" };
    return {
      ...storedUser,
      role: normalizeRole(storedUser.role),
    };
  });

  const [activeSubService, setActiveSubService] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);

  // --- EFFECTS ---

  // Reset Sub-Service view whenever the main page changes
  useEffect(() => {
    setActiveSubService(null);
  }, [page]);

  // Fetch Vehicle Health
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      fetch(`http://localhost:8081/api/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserVehicles(data))
        .catch((err) => console.error("Database connection error:", err));
    }
  }, [isLoggedIn, user]);

  
  if (!isLoggedIn) {
    return (
      <>
        {page === "login" && (
          <Login
            onLogin={(userdata) => {
              const fixedUser = {
                ...userdata,
                role: normalizeRole(userdata?.role),
              };
              const now = new Date().getTime();
              
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(fixedUser));
              localStorage.setItem("loginTimestamp", now.toString());

              setIsLoggedIn(true);
              setUser(fixedUser);
              setPage("home");
            }}
            goRegister={() => setPage("register")}
          />
        )}
        {page === "register" && (
          <Register goLogin={() => setPage("login")} />
        )}
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>VehicleServePro</h1>
        <p>Manage services, vehicles, and bookings in one place.</p>
      </div>

      <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", background: "#0a3d62", padding: "15px" }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("services")}>Services</button>
        <button onClick={() => setPage("team")}>Team</button>
        <button onClick={() => setPage("contact")}>Contact</button>

        {user?.role === "CUSTOMER" && (
          <>
            <button onClick={() => setPage("track")}>Track Service</button>
            <button onClick={() => setPage("feedback")}>Feedback</button>
          </>
        )}

        <button
          style={{ background: "crimson", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </button>

        <div className="user-profile" style={{ display: "flex", alignItems: "center", marginLeft: "20px", color: "white" }}>
          <div className="user-avatar" style={{ width: "35px", height: "35px", background: "#1e90ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "8px", fontWeight: "bold" }}>
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{user.name || "User"}</span>
        </div>
      </nav>

      <div className="page-wrapper">
        <div className="page-content">
          {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
          {page === "about" && <About />}
          {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
          {page === "team" && <Team />}
          {page === "contact" && <Contact />}
          {page === "vehicle" && <Dashboard />}
          {page === "centers" && <ServiceCenters />}
          {page === "billing" && <Billing />}

          {page === "track" && user?.role === "CUSTOMER" && (
            <div className="section-content">
              <h2>Vehicle Management & Status</h2>
              {!activeSubService ? (
                <>
                  <ServiceStatus bookingId={1} />
                  <div className="services-grid" style={{ marginTop: "30px" }}>
                    <div className="service-card" onClick={() => setActiveSubService("health")}>
                      <div className="service-icon" style={{ fontSize: "40px" }}>🚗</div>
                      <h3>Vehicle Health</h3>
                      <p>View engine, tire, and battery status metrics.</p>
                    </div>
                    <div className="service-card" onClick={() => setActiveSubService("locker")}>
                      <div className="service-icon" style={{ fontSize: "40px" }}>📁</div>
                      <h3>Document Locker</h3>
                      <p>Access Insurance, RC, and PUC certificates.</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="sub-service-view" style={{ marginTop: "20px" }}>
                  <button className="back-btn" onClick={() => setActiveSubService(null)} style={{ marginBottom: "20px", padding: "10px 20px", cursor: "pointer", borderRadius: "20px", border: "none", background: "#f0f2f5", fontWeight: "bold" }}>
                    ← Back to Management
                  </button>
                 
                 {activeSubService === "health" && (
  <div className="health-dashboard-container">
    {userVehicles.length > 0 ? (
      <div className="vehicle-cards-grid">
        {userVehicles.map((car, index) => (
          <div key={index} className="modern-vehicle-card">
            <div className="card-header">
              <div className="car-info">
                <h3>{car.name}</h3>
                <span className="plate-number">{car.carNumber || "N/A"}</span>
              </div>
              <div className="status-badge">Active</div>
            </div>
            
            <div className="card-body">
              {/* This uses the component we styled with circular rings */}
              <VehicleHealth 
                oil={car.oilHealth} 
                tire={car.tireHealth} 
                battery={car.batteryHealth} 
              />
            </div>

            <div className="card-footer">
              <button className="detail-btn">Service History</button>
              <button className="book-btn-small">Book Maintenance</button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <p>No vehicles found in your records.</p>
        <button className="action-btn" onClick={() => setPage("booking")}>Add Vehicle</button>
      </div>
    )}
  </div>
)}


                  {activeSubService === "locker" && <DocumentLocker />}
                </div>
              )}
            </div>
          )}

          {page === "booking" && <ServiceBooking onComplete={() => setPage("home")} />}
          {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}
        </div>
      </div>

          <footer style={{ background: "#0a3d62", color: "white", padding: "30px 20px", marginTop: "50px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          <div>
            <h3>VehicleServePro</h3>
            <p>Smart Vehicle Service & Maintenance Management System.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p onClick={() => setPage("home")} style={{ cursor: "pointer" }}>Home</p>
            <p onClick={() => setPage("services")} style={{ cursor: "pointer" }}>Services</p>
            <p onClick={() => setPage("booking")} style={{ cursor: "pointer" }}>Book Now</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vehicleservepro@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold" }}>
                ✉️ Email Us
              </a>
            </p>
            <p>
              <a href="https://wa.me/919925203480" target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold" }}>
                💬 WhatsApp Us
              </a>
            </p>
            <p>📍 Made in India</p>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "10px", fontSize: "14px" }}>
          © 2026 VehicleServePro | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default App;