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
import AdminSalesReport from "./components/AdminSalesReport";

const normalizeRole = (role) => {
  if (!role) return "CUSTOMER";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("MECHANIC")) return "MECHANIC";
  if (r.includes("CUSTOMER")) return "CUSTOMER";
  return "CUSTOMER";
};

function App() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("loginTimestamp");
    setIsLoggedIn(false);
    setUser({ role: "CUSTOMER" });
    setPage("login");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    const timestamp = localStorage.getItem("loginTimestamp");
    const currentTime = new Date().getTime();
    const SESSION_LIMIT = 24 * 60 * 60 * 1000;

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
              const fixedUser = {
                ...userdata,
                role: normalizeRole(userdata?.role || userdata?.user?.role),
              };
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
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>VehicleServePro</h1>
        <p>Manage services, vehicles, and bookings in one place.</p>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", background: "#0a3d62", padding: "15px" }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("services")}>Services</button>
        <button onClick={() => setPage("team")}>Team</button>
        <button onClick={() => setPage("contact")}>Contact</button>

        {/* Admin Specific Links */}
        {user?.role === "ADMIN" && (
          <button 
            style={{ background: "#f39c12", color: "white", fontWeight: "bold", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }} 
            onClick={() => setPage("sales-report")}
          >
            📈 Sales Report
          </button>
        )}

        {/* Customer Specific Links */}
        {user?.role === "CUSTOMER" && (
          <>
            <button onClick={() => setPage("feedback")}>Feedback</button>
          </>
        )}

        <button style={{ background: "crimson", color: "white" }} onClick={handleLogout}>Logout</button>

        <div style={{ display: "flex", alignItems: "center", marginLeft: "20px", color: "white" }}>
          <div style={{ width: "35px", height: "35px", background: "#1e90ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "8px", fontWeight: "bold" }}>
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>
          <span>{user.name || "User"}</span>
        </div>
      </nav>

      {/* --- PAGE CONTENT --- */}
      <div className="page-wrapper">
        <div className="page-content" style={{ padding: "20px" }}>
          {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
          {page === "about" && <About />}
          {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
          {page === "team" && <Team />}
          {page === "contact" && <Contact />}
          {page === "vehicle" && <Dashboard />}
          {page === "centers" && <ServiceCenters />}
          {page === "billing" && <Billing />}
          {page === "sales-report" && user.role === "ADMIN" && <AdminSalesReport />}
          {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}

         {/* --- CORRECTED TRACKING LOGIC --- */}
{page === "track" && (
  user?.role === "ADMIN" ? (
    
    <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#0a3d62' }}>Vehicle Tracking & Management</h2>
      <div style={{ 
        backgroundColor: "#fff3cd", color: "#856404", padding: "20px", borderRadius: "8px",
        border: "1px solid #ffeeba", margin: "20px auto", maxWidth: "600px"
      }}>
        <strong>Notice:</strong> Personal vehicle tracking is for Customer accounts. 
        As an Administrator, please use the <strong>Sales Report</strong> to view and manage all customer bookings.
      </div>
      <button 
        style={{ background: "#0a3d62", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        onClick={() => setPage("home")}
      >
        Return to Home
      </button>
    </div>
  ) : (
    
    <div className="section-content">
      <h2>Vehicle Management & Status</h2>
      {!activeSubService ? (
        <div className="services-grid" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div className="service-card" onClick={() => setActiveSubService("health")} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
            <h3>🚗 Vehicle Health</h3>
          </div>
          <div className="service-card" onClick={() => setActiveSubService("locker")} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
            <h3>📁 Document Locker</h3>
          </div>
          <div className="service-card" onClick={() => setActiveSubService("status")} style={{ cursor: "pointer", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", flex: "1", textAlign: "center", background: "#e1f5fe" }}>
            <h3>⏱️ Live Service Status</h3>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => setActiveSubService(null)}>← Back</button>
          {activeSubService === "health" && <VehicleHealth vehicles={userVehicles} />}
          {activeSubService === "locker" && <DocumentLocker />}
          {activeSubService === "status" && <ServiceStatus vehicles={userVehicles} />}
        </div>
      )}
    </div>
  )
)}

          {/* Booking Logic with Admin Guard */}
          {page === "booking" && (
            user.role === "ADMIN" ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>Admin Access</h2>
                <p>Admins handle reports. Please use the "Sales Report" button above.</p>
                <button onClick={() => setPage("home")}>Go Home</button>
              </div>
            ) : (
              <ServiceBooking onComplete={() => setPage("home")} />
            )
          )}
        </div>
      </div>

         <footer style={{
        background: "#0a3d62",
        color: "white",
        padding: "30px 20px",
        marginTop: "50px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          <div>
            <h3>VehicleServePro</h3>
            <p>Smart Vehicle Service & Maintenance Management System.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>Services</p>
            <p>Team</p>
            <p>Dashboard</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📧 vehicleservepro@gmail.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍Made in India</p>
          </div>
        </div>

        <div style={{
          textAlign: "center",
          marginTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: "10px",
          fontSize: "14px"
        }}>
          © 2026 VehicleServePro | All Rights Reserved
        </div>
      </footer>

    </>
  );
}


export default App;