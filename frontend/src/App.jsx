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
      {/* --- STICKY HEADER SECTION --- */}
      <header style={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 1000, 
        background: "#fff", 
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
      }}>
        <div style={{ textAlign: "center", padding: "10px 20px" }}>
          <h1 style={{ margin: 0, color: "#0a3d62", fontSize: "1.8rem" }}>VehicleServePro</h1>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>Manage services, vehicles, and bookings in one place.</p>
        </div>

        <nav style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", background: "#0a3d62", padding: "12px", flexWrap: "wrap" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("services")}>Services</button>
          <button onClick={() => setPage("team")}>Team</button>
          <button onClick={() => setPage("contact")}>Contact</button>

          {user?.role === "ADMIN" && (
            <button style={{ background: "#f39c12", color: "white", fontWeight: "bold", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }} onClick={() => setPage("sales-report")}>
              📈 Sales Report
            </button>
          )}

          {user?.role === "CUSTOMER" && (
            <>
              <button onClick={() => setPage("billing")}>My Bills</button>
              <button onClick={() => setPage("feedback")}>Feedback</button>
            </>
          )}

          <button style={{ background: "crimson", color: "white" }} onClick={handleLogout}>Logout</button>

          <div style={{ display: "flex", alignItems: "center", marginLeft: "20px", color: "white" }}>
            <div style={{ width: "30px", height: "30px", background: "#1e90ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "8px", fontWeight: "bold", fontSize: "14px" }}>
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
            <span style={{ fontSize: "14px" }}>{user.name || "User"}</span>
          </div>
        </nav>
      </header>

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="page-wrapper" style={{ padding: "20px" }}>
        {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
        {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
        {page === "team" && <Team />}
        {page === "contact" && <Contact />}
        {page === "vehicle" && <Dashboard />}
        {page === "centers" && <ServiceCenters />}
        {page === "billing" && <Billing user={user} />}
        {page === "sales-report" && user.role === "ADMIN" && <AdminSalesReport />}
        {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}

        {page === "track" && (
          <div className="section-content">
            {user?.role === "ADMIN" ? (
              <div style={{ textAlign: 'center', padding: '50px', background: '#fff', borderRadius: '15px' }}>
                <h2>Vehicle Tracking</h2>
                <p>Personal tracking is for Customers. Use Sales Report for Admin tasks.</p>
                <button onClick={() => setPage("home")}>Return Home</button>
              </div>
            ) : (
              <div>
                <h2>{user.role === "MECHANIC" ? "Mechanic Workstation" : "Vehicle Status"}</h2>
                {!activeSubService ? (
                  <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    <div className="service-card" onClick={() => setActiveSubService("health")} style={cardStyle}><h3>🚗 Health</h3></div>
                    {user.role === "CUSTOMER" && <div className="service-card" onClick={() => setActiveSubService("locker")} style={cardStyle}><h3>📁 Locker</h3></div>}
                    <div className="service-card" onClick={() => setActiveSubService("status")} style={{ ...cardStyle, background: "#e1f5fe" }}><h3>⏱️ Status</h3></div>
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
            )}
          </div>
        )}

        {page === "booking" && (
          user.role === "CUSTOMER" ? <ServiceBooking onComplete={() => setPage("home")} /> : <div style={{ textAlign: 'center' }}><h2>Access Denied</h2><button onClick={() => setPage("home")}>Go Home</button></div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer style={{ background: "#0a3d62", color: "white", padding: "30px 20px", marginTop: "50px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
          <div><h3>VehicleServePro</h3><p>Smart Vehicle Management System.</p></div>
          <div><h4>Quick Links</h4><p onClick={() => setPage("home")} style={{ cursor: "pointer" }}>Home</p></div>
          <div><h4>Contact</h4><p>📍 Made in India</p></div>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px", paddingTop: "10px", fontSize: "14px" }}>
          © 2026 VehicleServePro | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

const cardStyle = { cursor: "pointer", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", flex: 1, textAlign: "center" };

export default App;