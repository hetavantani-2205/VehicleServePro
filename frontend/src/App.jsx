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
  }, [page]);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/api/bookings?email=${user.email}`)
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
              const fixedUser = { ...userdata, role: normalizeRole(userdata?.role || userdata?.user?.role) };
              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(fixedUser));
              localStorage.setItem("loginTimestamp", new Date().getTime().toString());
              setIsLoggedIn(true);
              setUser(fixedUser);
              setPage("home");
            }}
            goRegister={() => setPage("register")}
          />
        )}
        {page === "register" && <Register goLogin={() => setPage("login")} />}
      </>
    );
  }

  return (
    <>
      <header className="site-header">
        <h1>VehicleServePro</h1>
        <p>Manage services, vehicles, and bookings in one place.</p>
      </header>

      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("services")}>Services</button>
        <button onClick={() => setPage("team")}>Team</button>
        <button onClick={() => setPage("contact")}>Contact</button>

        {user?.role === "ADMIN" && (
          <button className="book-btn-small" onClick={() => setPage("sales-report")}>
            📈 Sales Report
          </button>
        )}

        {user?.role === "CUSTOMER" && (
          <>
            <button className="book-btn-small" onClick={() => setPage("billing")}>My Bills</button>
            <button className="book-btn-small" onClick={() => setPage("feedback")}>Feedback</button>
            <button className="book-btn-small ai-btn" onClick={() => setPage("ai-mechanic")}>
              🤖 AI Mechanic
            </button>
          </>
        )}

        <button className="book-btn-small logout-btn" onClick={handleLogout}>Logout</button>

        <div className="user-avatar">
          <div className="avatar-circle">
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
          <span>{user.name || "User"}</span>
        </div>
      </nav>

      <div className="container page-wrapper">
        {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
        {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
        {page === "team" && <Team />}
        {page === "contact" && <Contact />}
        {page === "vehicle" && <Dashboard />}
        {page === "centers" && <ServiceCenters />}
        {page === "billing" && <Billing user={user} />}
        {page === "sales-report" && user.role === "ADMIN" && <AdminSalesReport />}
        {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}
        {page === "ai-mechanic" && <VirtualMechanic />}

        {page === "track" && (
          <div className="section-content">
            {user?.role === "ADMIN" ? (
              <div className="service-card" style={{ textAlign: 'center', padding: '3rem' }}>
                <h2>Vehicle Tracking</h2>
                <p>Personal tracking is for Customers. Use Sales Report for Admin tasks.</p>
                <button className="book-btn-small" onClick={() => setPage("home")}>Return Home</button>
              </div>
            ) : (
              <div>
                <h2>{user.role === "MECHANIC" ? "Mechanic Workstation" : "Vehicle Status"}</h2>
                {!activeSubService ? (
                  <div className="services-grid">
                    <div className="service-card" onClick={() => setActiveSubService("health")}>
                      <h3>🚗 Health</h3>
                    </div>
                    {user.role === "CUSTOMER" && (
                      <div className="service-card" onClick={() => setActiveSubService("locker")}>
                        <h3>📁 Locker</h3>
                      </div>
                    )}
                    <div className="service-card" onClick={() => setActiveSubService("status")}>
                      <h3>⏱️ Status</h3>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button className="book-btn-small" onClick={() => setActiveSubService(null)}>← Back</button>
                    {activeSubService === "health" && <VehicleHealth vehicles={userVehicles} />}
                    {activeSubService === "locker" && <DocumentLocker />}
                    {activeSubService === "status" && <ServiceStatus vehicles={userVehicles} />}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {page === "booking" && (
          user.role === "CUSTOMER" ? 
            <ServiceBooking onComplete={() => setPage("home")} /> : 
            <div className="service-card" style={{ textAlign: 'center', maxWidth: '400px', margin: '2rem auto' }}>
              <h2>Access Denied</h2>
              <button className="book-btn-small" onClick={() => setPage("home")}>Go Home</button>
            </div>
        )}
      </div>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h3>VehicleServePro</h3>
            <p>Smart Vehicle Service & Maintenance Management System.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p onClick={() => setPage("home")}>Home</p>
            <p onClick={() => setPage("services")}>Services</p>
            <p onClick={() => setPage("booking")}>Book Now</p>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vehicleservepro@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-link">
              ✉️ Email Us
            </a>
            <a href="https://wa.me/919925203480" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              💬 WhatsApp Us
            </a>
            <p>📍 Made in India</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 VehicleServePro | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default App;
