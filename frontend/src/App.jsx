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
import VirtualMechanic from "./components/VirtualMechanic";
import "./App.css";

const normalizeRole = (role) => {
  if (!role) return "CUSTOMER";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("MECHANIC")) return "MECHANIC";
  return "CUSTOMER";
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [page, setPage] = useState(isLoggedIn ? "home" : "login");

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) return { role: "CUSTOMER" };
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
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      fetch($`{import.meta.env.VITE_API_URL}/api/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserVehicles(data))
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn, user]);

  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
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
    );
  }

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          VSP
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("services")}>Services</button>
          <button onClick={() => setPage("team")}>Team</button>
          <button onClick={() => setPage("contact")}>Contact</button>
          {user.role === "ADMIN" && (
            <button onClick={() => setPage("sales-report")}>
              Sales
            </button>
          )}
        </div>

        <div className="nav-user">
          <span>{user.name || "User"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        {page === "home" && (
          <Home
            onBookClick={() => setPage("booking")}
            onViewDashboard={() => setPage("track")}
          />
        )}
        {page === "services" && <Services />}
        {page === "team" && <Team />}
        {page === "contact" && <Contact />}
        {page === "vehicle" && <Dashboard />}
        {page === "centers" && <ServiceCenters />}
        {page === "billing" && <Billing user={user} />}
        {page === "sales-report" && <AdminSalesReport />}
        {page === "feedback" && <Feedback />}
        {page === "ai-mechanic" && <VirtualMechanic />}

        {page === "track" && (
          <div>
            {!activeSubService ? (
              <div className="track-grid">
                <button onClick={() => setActiveSubService("health")}>
                  Health
                </button>
                <button onClick={() => setActiveSubService("locker")}>
                  Locker
                </button>
                <button onClick={() => setActiveSubService("status")}>
                  Status
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setActiveSubService(null)}>
                  Back
                </button>
                {activeSubService === "health" && (
                  <VehicleHealth vehicles={userVehicles} />
                )}
                {activeSubService === "locker" && (
                  <DocumentLocker />
                )}
                {activeSubService === "status" && (
                  <ServiceStatus vehicles={userVehicles} />
                )}
              </>
            )}
          </div>
        )}

        {page === "booking" && (
          <ServiceBooking onComplete={() => setPage("home")} />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 VehicleServePro. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;