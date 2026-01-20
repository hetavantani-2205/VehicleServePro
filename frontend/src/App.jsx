import { useState } from "react";
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


function App() {
  const [page, setPage] = useState(
  localStorage.getItem("isLoggedIn") === "true" ? "home" : "login"
);

const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);

const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);


  
  if (!isLoggedIn) {
    return (
      <>
        {page === "login" && (
          <Login
            onLogin={(userdata) => {
              setIsLoggedIn(true);
              setUser(userdata);

                  localStorage.setItem("isLoggedIn", "true");
                  localStorage.setItem("user", JSON.stringify(userdata));


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
      {/* Header */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>VehicleServePro</h1>
        <p>Manage services, vehicles and bookings in one place.</p>
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

        {(user?.role === "ADMIN") && (
     <button onClick={() => setPage("billing")}>Billing</button>
  )}
        

       

          
        


        <button
          style={{ background: "crimson" }}
          onClick={() => {
            setIsLoggedIn(false);
            setPage("login");

              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("user");
          }}
        >
          Logout
        </button>
      </nav>

    <div className="page-wrapper">
  <div className="page-content">
    {page === "home" && <Home />}
    {page === "about" && <About />}
    {page === "services" && (
      <Services 
        openBilling={() => setPage("billing")}
        openvehicle={() => setPage("vehicle")}
        openCenters={() => setPage("centers")}
        user={user}
      />
    )}
    {page === "team" && <Team />}
    {page === "contact" && <Contact />}
    {page === "vehicle" && <Dashboard />}
    {page === "billing" && <Billing />}
    {page === "centers" && <ServiceCenters />}

   </div>



      </div>
            {/* Footer */}
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
