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

const normalizeRole = (role) => {
  if (!role) return "CUSTOMER";
  const r = role.toUpperCase();
  if (r.includes("ADMIN")) return "ADMIN";
  if (r.includes("MECHANIC")) return "MECHANIC";
  if (r.includes("CUSTOMER")) return "CUSTOMER";
  return "CUSTOMER";
};

function App() {

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [page, setPage] = useState(
    localStorage.getItem("isLoggedIn") === "true" ? "home" : "login"
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [user, setUser] = useState(() => {
    if (!storedUser) return { role: "CUSTOMER" };
    return {
      ...storedUser,
      role: normalizeRole(storedUser.role),
    };
  });

  useEffect(() => {
    if (isLoggedIn && !page) {
      setPage("home");
    }
  }, [isLoggedIn, page]);



  if (!isLoggedIn) {
    return (
      <>
        {page === "login" && (
          <Login
            onLogin={(userdata) => {

              const fixedUser = {
                ...userdata,
                name: userdata.name,
                role: normalizeRole(userdata?.role),
              };

              setIsLoggedIn(true);
              setUser(fixedUser);

              localStorage.setItem("isLoggedIn", "true");
              localStorage.setItem("user", JSON.stringify(fixedUser));

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

  console.log("Current User Data:", user);



  return (
    <>
      {/* Header */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>VehicleServePro</h1>
        <p>Manage services, vehicles, and bookings in one place.</p>
      </div>

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          background: "#0a3d62",
          padding: "15px",
        }}
      >
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("services")}>Services</button>
        <button onClick={() => setPage("team")}>Team</button>
        <button onClick={() => setPage("contact")}>Contact</button>

        <button onClick={() => setPage("billing")}>Billing</button>

        {/* CUSTOMER ONLY */}
        {user?.role === "CUSTOMER" && (
          <>
            <button onClick={() => setPage("track")}>Track Service</button>
            <button onClick={() => setPage("feedback")}>Feedback</button>
          </>
        )}

        <button
          style={{ background: "crimson", color: "white" }}
          onClick={() => {
            setIsLoggedIn(false);
            setPage("login");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
          }}
        >
          Logout
        </button>

    {user ? (
  <div className="user-profile">
    <div className="user-avatar">
      {/* Target the 'name' property from your database table */}
      {(user.name || "U").charAt(0).toUpperCase()}
    </div>
    <span className="user-name">
      {user.name || "User"}
    </span>
  </div>
) : null}
    </nav>


      {/* Page Content */}
      <div className="page-wrapper">
        <div className="page-content">

          {page === "home" && (
            <Home
              onBookClick={() => setPage("booking")}
              onViewDashboard={() => setPage("track")}
            />
          )}

          {page === "about" && <About />}

          {page === "services" && (
            <Services
              openBilling={() => setPage("billing")}
              openvehicle={() => setPage("vehicle")}
              openCenters={() => setPage("centers")}
              openBooking={() => setPage("booking")}
              user={user}
            />
          )}

          {page === "team" && <Team />}
          {page === "contact" && <Contact />}

          {page === "vehicle" && <Dashboard />}
          
          {page === "centers" && <ServiceCenters />}

          {/* ADMIN protected */}
          {page === "billing" && <Billing />}


          {/* CUSTOMER protected */}
          {page === "track" && user?.role === "CUSTOMER" && (
            <>
            <ServiceStatus bookingId={3} />

          </>
      
          )}

          {page === "booking" && (
            <ServiceBooking onComplete={() => setPage("home")} />
          )}

          {/* CUSTOMER protected */}
          {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}

        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#0a3d62",
          color: "white",
          padding: "30px 20px",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <div>
            <h3>VehicleServePro</h3>
            <p>Smart Vehicle Service & Maintenance Management System.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
              Home
            </p>
            <p onClick={() => setPage("services")} style={{ cursor: "pointer" }}>
              Services
            </p>
            <p onClick={() => setPage("booking")} style={{ cursor: "pointer" }}>
              Book Now
            </p>
            <p onClick={() => setPage("vehicle")} style={{ cursor: "pointer" }}>
              My Dashboard
            </p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>📧 vehicleservepro@gmail.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 Made in India</p>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "10px",
            fontSize: "14px",
          }}
        >
          © 2026 VehicleServePro | All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default App;