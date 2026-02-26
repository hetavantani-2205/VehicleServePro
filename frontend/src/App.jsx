import { useState, useEffect } from "react";
import Home from "./components/Home";
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
import AdminSalesReport from "./components/AdminSalesReport";
import MechanicChecklist from "./components/MechanicChecklist";
import VirtualMechanic from "./components/VirtualMechanic";
import "./App.css";
import workshop from "./assets/workshop.jpeg";

const normalizeRole = (role) => {
  if (!role) return "CUSTOMER";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("MECHANIC")) return "MECHANIC";
  return "CUSTOMER";
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    const timestamp = localStorage.getItem("loginTimestamp");
    const currentTime = new Date().getTime();
    const SESSION_LIMIT = 24 * 60 * 60 * 1000;

    if (status && timestamp && currentTime - timestamp > SESSION_LIMIT) {
      localStorage.clear();
      return false;
    }
    return status;
  });

  const [page, setPage] = useState(isLoggedIn ? "home" : "login");
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !isLoggedIn) return { role: "CUSTOMER" };
    return { ...storedUser, role: normalizeRole(storedUser.role) };
  });

  const [activeSubService, setActiveSubService] = useState(null);
  const [userVehicles, setUserVehicles] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser({ role: "CUSTOMER" });
    setPage("login");
  };

  useEffect(() => {
    setActiveSubService(null);
    window.scrollTo(0, 0);
  }, [page]);

const fetchBookings = () => {
  if (user?.email) {
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings?email=${user.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUserVehicles(data);
        } else {
          setUserVehicles([]);
        }
      })
      .catch((err) => {
        console.error("Database connection error:", err);
        setUserVehicles([]);
      });
  }
};



useEffect(() => {
  if (isLoggedIn && user?.email) {
    fetchBookings();
  }
}, [isLoggedIn, user]);

  if (!isLoggedIn) {
  return (
    <div
      className="auth-wrapper"
      style={{ backgroundImage: `url(${workshop})`}}
    >
      <div className="auth-overlay"></div>

      <div className="login-box">
        {page === "login" && (
          <Login
            onLogin={(userdata) => {
              const fixedUser = {
                ...userdata,
                role: normalizeRole(
                  userdata?.role || userdata?.user?.role
                ),
              };
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(fixedUser));
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
      </div>
    </div>
  );
}

  return (
    <div className="app-main-layout">
      {/* 1. STICKY NAVIGATION */}
      <nav className="modern-nav">
        <div className="nav-logo" onClick={() => setPage("home")}>VSP</div>
        
        <div className="nav-links">
          <button className={page === "home" ? "active" : ""} onClick={() => setPage("home")}>Home</button>
          <button className={page === "services" ? "active" : ""} onClick={() => setPage("services")}>Services</button>
          <button className={page === "team" ? "active" : ""} onClick={() => setPage("team")}>Team</button>
          <button className={page === "contact" ? "active" : ""} onClick={() => setPage("contact")}>Contact</button>

          {user?.role === "ADMIN" && (
            <button className="book-btn-small" onClick={() => setPage("sales-report")}>
              📈 Sales
            </button>
          )}

          {user?.role === "CUSTOMER" && (
            <>
              <button className="book-btn-small" onClick={() => setPage("billing")}>My Bills</button>
              <button className="book-btn-small ai-btn" onClick={() => setPage("ai-mechanic")}>
                🤖 AI Mechanic
              </button>
              <button className={page === "feedback" ? "active" : ""} onClick={() => setPage("feedback")}>Feedback</button>
            </>
          )}
        </div>

        <div className="user-profile-section">
  {  /* Theme Toggle could go here too */}
  
  <div className="user-info-group">
    <div className="user-details">
      <span className="user-name-label">{user.name || "User"}</span>
      <span className="user-role">Account Active</span>
    </div>
    <div className="avatar-circle">
      {(user.name || "U").charAt(0).toUpperCase()}
    </div>
  </div>
  
  <button className="logout-btn" onClick={handleLogout} title="Logout">
    Logout
  </button>
</div>
      </nav>

      {/* 2. PAGE CONTENT AREA */}
      <main className="content-area">
        {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
        
        <div className="container">
          {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
          {page === "team" && <Team />}
          {page === "contact" && <Contact />}
          {page === "vehicle" && <Dashboard />}
          {page === "centers" && <ServiceCenters />}
          {page === "billing" && <Billing user={user} />}
          {page === "sales-report" && user.role === "ADMIN" && <AdminSalesReport />}
          {page === "feedback"  && <Feedback />}
          {page === "ai-mechanic" && <VirtualMechanic />}

          {page === "track" && (
            <div className="section-content">
              {user?.role === "ADMIN" ? (
                <div className="service-card centered-card">
                  <h2>Vehicle Tracking</h2>
                  <p>Personal tracking is for Customers. Use Sales Report for Admin tasks.</p>
                  <button className="book-btn-small" onClick={() => setPage("home")}>Return Home</button>
                </div>
              ) : (
                <div className="tracking-sub-module">
                  <h2 className="section-title">{user.role === "MECHANIC" ? "Mechanic Workstation" : "Vehicle Status"}</h2>
                  {!activeSubService ? (
                    <div className="services-grid bento-grid">
                      <div className="service-card bento-item" onClick={() => setActiveSubService("health")}>
                        <div className="bento-icon">🚗</div>
                        <h3>Health Metrics</h3>
                      </div>
                      {user.role === "CUSTOMER" && (
                        <div className="service-card bento-item" onClick={() => setActiveSubService("locker")}>
                          <div className="bento-icon">📁</div>
                          <h3>Document Locker</h3>
                        </div>
                      )}
                      <div className="service-card bento-item" onClick={() => setActiveSubService("status")}>
                        <div className="bento-icon">⏱️</div>
                        <h3>Live Status</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="active-sub-view">
                      <button className="back-btn" onClick={() => setActiveSubService(null)}>← Back to Dashboard</button>
                      <div className="sub-component-render">
                        {activeSubService === "health" && <VehicleHealth vehicles={userVehicles} />}
                        {activeSubService === "locker" && <DocumentLocker />}
                        {activeSubService === "status" && <ServiceStatus vehicles={userVehicles} />}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {page === "booking" && (
            user.role === "CUSTOMER" ? 
              <ServiceBooking
               user={user}
               onComplete={() => {
                fetchBookings();
              }} /> : 
              <div className="service-card centered-card">
                <h2>Access Denied</h2>
                <button className="book-btn-small" onClick={() => setPage("home")}>Go Home</button>
              </div>
          )}
        </div>
      </main>

      {/* 3. SITE FOOTER */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>VehicleServePro</h3>
            <p>The future of smart vehicle maintenance management.</p>
          </div>
          <div className="footer-links">
            <h4>Sitemap</h4>
            <ul>
              <li onClick={() => setPage("home")}>Home</li>
              <li onClick={() => setPage("services")}>Services</li>
              <li onClick={() => setPage("booking")}>Book Now</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Support</h4>
            <a href="mailto:vehicleservepro@gmail.com" className="contact-link">✉️ Email</a>
            <a href="https://wa.me/919925203480" className="whatsapp-link">💬 WhatsApp</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 VehicleServePro | Designed for Excellence
        </div>
      </footer>
    </div>
  );
}

export default App;