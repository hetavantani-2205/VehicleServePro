import { useEffect, useState } from "react";
import banner_1 from "../assets/banner_1.jpg";
import banner_2 from "../assets/banner_2.jpg";
import banner_3 from "../assets/banner_3.jpg";

const images = [banner_1, banner_2, banner_3];

export default function Home({ onBookClick, onViewDashboard }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[80vh] w-full overflow-hidden rounded-[40px] shadow-2xl">
        {/* Image Slider */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img 
              src={img} 
              alt="Automotive banner" 
              className="h-full w-full object-cover scale-105 animate-pulse-slow"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-[#080a0f]/40 to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
            Experience <span className="text-blue-500">Precision</span> Care
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed drop-shadow">
            Your smart solution for vehicle service, real-time tracking, and 
            digital management—engineered for the road ahead.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
              onClick={onBookClick}
            >
              Book Service Now
            </button>
            <button 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-bold text-lg transition-all"
              onClick={onViewDashboard}
            >
              Track Vehicle
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-blue-500" : "w-2 bg-white/30"}`} 
            />
          ))}
        </div>
      </section>

      {/* 2. BENTO STATS GRID (The "About" Highlights) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Driving Excellence</h2>
          <p className="text-slate-500 text-lg">Cutting-edge technology meets automotive expertise.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-[#11141d] border border-white/5 p-8 rounded-[32px] hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Real-time Tracking</h4>
            <p className="text-slate-400 leading-relaxed">
              Monitor your vehicle's health and service status instantly from your personalized cloud dashboard.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-[#11141d] border border-white/5 p-8 rounded-[32px] hover:border-purple-500/50 transition-all">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              🛡️
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Secure Locker</h4>
            <p className="text-slate-400 leading-relaxed">
              Keep your RC, Insurance, and PUC documents safe in our encrypted vault, accessible anywhere in the world.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-[#11141d] border border-white/5 p-8 rounded-[32px] hover:border-emerald-500/50 transition-all">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              🛠️
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Expert Service</h4>
            <p className="text-slate-400 leading-relaxed">
              Connected with only verified, top-tier service centers to provide your vehicle the care it deserves.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MISSION SECTION (Modern Split Layout) */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-24">
        <div className="space-y-6">
          <h3 className="text-blue-500 font-bold tracking-widest uppercase text-sm">Our Mission</h3>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Making maintenance as seamless as driving.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            VehicleServePro was born to digitize the automotive lifecycle. No more paper trails or 
            guessing when your next oil change is due. We bring your car into the digital age.
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Automated Reminders",
              "Transparent Metrics",
              "Verified Partners",
              "Cloud Storage"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white font-medium">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative aspect-video bg-[#11141d] border border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center p-12 overflow-hidden">
             <div className="text-6xl font-black text-white/10 absolute -top-4 -left-4 select-none">VSP</div>
             <div className="text-4xl font-black text-white mb-2">VehicleServePro</div>
             <div className="px-4 py-1 bg-blue-500/20 text-blue-500 rounded-full text-xs font-bold tracking-widest uppercase">
               Established 2026
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}