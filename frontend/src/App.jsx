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
import './App.css';

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
      <div className="min-h-screen bg-[#080a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#11141d] border border-white/10 p-8 rounded-[40px] shadow-2xl">
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a0f] text-slate-200 flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* 1. STICKY GLASSMORPHISM NAV */}
      <nav className="sticky top-4 z-50 w-[94%] max-w-7xl mx-auto bg-[#11141d]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl transition-all">
        <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform" onClick={() => setPage("home")}>
          VSP
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          {["home", "services", "team", "contact"].map((item) => (
            <button 
              key={item}
              onClick={() => setPage(item)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize ${page === item ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {item}
            </button>
          ))}
          
          {user?.role === "ADMIN" && (
            <button className="px-5 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-sm font-bold hover:bg-amber-500 hover:text-white transition-all ml-2" onClick={() => setPage("sales-report")}>
              📊 Admin Sales
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Verified {user.role}</span>
            <span className="text-sm font-medium text-white">{user.name || "Member"}</span>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[2px] cursor-pointer group-hover:rotate-12 transition-transform">
              <div className="w-full h-full rounded-full bg-[#11141d] flex items-center justify-center font-bold text-white">
                {(user.name || "U").charAt(0).toUpperCase()}
              </div>
            </div>
            <button 
              onClick={handleLogout} 
              className="absolute top-12 right-0 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {page === "home" && <Home onBookClick={() => setPage("booking")} onViewDashboard={() => setPage("track")} />}
        
        <div className="space-y-12">
          {page === "services" && <Services openBilling={() => setPage("billing")} openvehicle={() => setPage("vehicle")} openCenters={() => setPage("centers")} openBooking={() => setPage("booking")} user={user} />}
          {page === "team" && <Team />}
          {page === "contact" && <Contact />}
          {page === "vehicle" && <Dashboard />}
          {page === "centers" && <ServiceCenters />}
          {page === "billing" && <Billing user={user} />}
          {page === "sales-report" && user.role === "ADMIN" && <AdminSalesReport />}
          {page === "feedback" && user.role === "CUSTOMER" && <Feedback />}
          {page === "ai-mechanic" && <VirtualMechanic />}

          {/* VEHICLE TRACKING BENTO MODULE */}
          {page === "track" && (
            <div className="bg-[#11141d]/50 border border-white/5 rounded-[48px] p-8 md:p-12 backdrop-blur-3xl animate-in fade-in zoom-in duration-500">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-black text-white mb-3">Vehicle Command Center</h2>
                <p className="text-slate-500">Intelligent real-time monitoring for {user.name}'s fleet</p>
              </div>

              {!activeSubService ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "health", icon: "🚀", title: "Health Metrics", color: "from-blue-500/20" },
                    { id: "locker", icon: "🛡️", title: "Document Locker", color: "from-purple-500/20", role: "CUSTOMER" },
                    { id: "status", icon: "⚡", title: "Live Status", color: "from-emerald-500/20" }
                  ].map((card) => (
                    (!card.role || card.role === user.role) && (
                      <div 
                        key={card.id}
                        onClick={() => setActiveSubService(card.id)}
                        className={`group cursor-pointer bg-white/5 border border-white/10 p-10 rounded-[40px] hover:border-blue-500/50 hover:bg-gradient-to-br ${card.color} to-transparent transition-all duration-300`}
                      >
                        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{card.icon}</div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400">{card.title}</h3>
                        <p className="text-slate-500 text-sm mt-2">Access encrypted cloud data</p>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-8 duration-500">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 group" onClick={() => setActiveSubService(null)}>
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Dashboard
                  </button>
                  <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 shadow-inner">
                    {activeSubService === "health" && <VehicleHealth vehicles={userVehicles} />}
                    {activeSubService === "locker" && <DocumentLocker />}
                    {activeSubService === "status" && <ServiceStatus vehicles={userVehicles} />}
                  </div>
                </div>
              )}
            </div>
          )}

          {page === "booking" && (
            <div className="max-w-4xl mx-auto">
               <ServiceBooking onComplete={() => setPage("home")} />
            </div>
          )}
        </div>
      </main>

      {/* 3. SITE FOOTER */}
      <footer className="bg-black/50 border-t border-white/5 py-16 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">VehicleServePro</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Next-generation automotive service platform leveraging AI diagnostics and cloud fleet management.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Platform</h4>
              <button onClick={() => setPage("services")} className="block text-slate-500 hover:text-blue-400 text-sm">Services</button>
              <button onClick={() => setPage("track")} className="block text-slate-500 hover:text-blue-400 text-sm">Tracking</button>
            </div>
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">Company</h4>
              <button onClick={() => setPage("team")} className="block text-slate-500 hover:text-blue-400 text-sm">Our Team</button>
              <button onClick={() => setPage("contact")} className="block text-slate-500 hover:text-blue-400 text-sm">Contact</button>
            </div>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-white font-bold text-sm">Concierge Support</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@vsp.com" className="text-blue-400 text-sm hover:underline">✉️ official@vsp.io</a>
              <a href="https://wa.me/919925203480" className="text-green-400 text-sm hover:underline">💬 WhatsApp Direct</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em]">
          &copy; 2026 VehicleServePro &bull; Automotive Intelligence System &bull; All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

export default App;