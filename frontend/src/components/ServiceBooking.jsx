import React, { useState, useEffect } from 'react';

const formatCarNumber = (value) => {
  return value.replace(/\s/g, '').toUpperCase();
};

const servicePrices = {
  "General Service": 1500,
  "Oil Change": 800,
  "Brake Inspection": 1200,
  "Wheel Alignment": 1000
};

function ServiceBooking({ onComplete,user }) {
  const [formData, setFormData] = useState({
    name: '',
    carName: '',
    carNo: '',
    chassisNo: '',
    serviceType: 'General Service',
    city: '',
    serviceCenter: ''
  });

  const [cities, setCities] = useState([]);
  const [centers, setCenters] = useState([]); 
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  
  useEffect(() => {
    const fetchCenters = async () => {
      if (!formData.city) {
        setCenters([]);
        return;
      }
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/centers?city=${formData.city}`);
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error("Error fetching centers:", error);
      }
    };
    fetchCenters();
  }, [formData.city]);

  const handleBooking = async (e) => {
    e.preventDefault();

    const carNoPattern = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    if (!carNoPattern.test(formData.carNo)) {
    setNotification({ message: "❌ Invalid Car Number (e.g. GJ06AB1234)", type: "error" });
    return;
  }

    if (!formData.name.trim() || !formData.carName.trim() || !formData.carNo.trim() || !formData.chassisNo.trim() || !formData.city || !formData.serviceCenter) {
      setNotification({ message: "❌ Please fill all required fields", type: "error" });
      return;
    }

    if (formData.chassisNo.length !== 6) {
      setNotification({ message: "❌ Enter only last 6 characters of chassis number", type: "error" });
      return;
    }

    
    const active = localStorage.getItem("bookingStatus");
    if (active && active !== "COMPLETED") {
      setNotification({ message: "⚠️ You already have an active booking.", type: "error" });
      return;
    }

  

    const payload = {
      name: formData.name,
      email: user?.email,
      carName: formData.carName,
      carNumber: formData.carNo,
      chassisNumber: formData.chassisNo,
      serviceType: formData.serviceType,
      city: formData.city,
      serviceCenter: formData.serviceCenter,
      price: servicePrices[formData.serviceType] || 1000
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedBooking = await response.json();
        localStorage.setItem("bookingId", savedBooking.id);
        setNotification({ message: "✅ Booking successful!", type: "success" });
        onComplete();
        setFormData({
          name: "", carName:"",
           carNo: "", chassisNo: "", serviceType: "General Service", city: "", serviceCenter: ""
        });
      } else {
        setNotification({ message: "❌ Server error occurred", type: "error" });
      }
    } catch (error) {
      setNotification({ message: "❌ Network error", type: "error" });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Book Your Service</h2>
        <p style={styles.subtitle}>Please fill in the details below to schedule your maintenance.</p>

        {notification.message && (
          <div style={{
            ...styles.notification,
            backgroundColor: notification.type === "success" ? "#d4edda" : "#f8d7da",
            color: notification.type === "success" ? "#155724" : "#721c24",
            border: `1px solid ${notification.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
          }}>
            {notification.message}
          </div>
        )}

        <form onSubmit={handleBooking} style={styles.form}>
          <label style={styles.label}>Customer Name *</label>
          <input 
            style={styles.input}
            type="text" 
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <label style={styles.label}>Car Name *</label>
          <input 
            style={styles.input}
            type="text" 
            placeholder="e.g. Toyota Fortuner"
            value={formData.carName}
            onChange={(e) => setFormData({...formData, carName: e.target.value})} 
          />

          <label style={styles.label}>Car Number *</label>
          <input 
            style={styles.input}
            type="text" 
            placeholder="e.g. MH12AB1234"
            value={formData.carNo}
            maxLength={10}
            onChange={(e) => setFormData({...formData, carNo: e.target.value})} 
            required
          />

          <label style={styles.label}>Chassis Number *</label>
          <input 
            style={styles.input}
            type="text" 
            placeholder="Enter last 6 characters of your chassis number."
            value={formData.chassisNo}
            maxLength={6}
            onChange={(e) => setFormData({...formData, chassisNo: e.target.value})} 
          />

          <label style={styles.label}>Service Type</label>
          <select 
            style={styles.input}
            value={formData.serviceType}
            onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
          >
            <option value="General Service">General Service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Brake Inspection">Brake Inspection</option>
            <option value="Wheel Alignment">Wheel Alignment</option>
          </select>

          {/* Replace your current CITY SELECTION block with this */}
         <label style={styles.label}>Select City *</label>
    <select 
        style={styles.input}
        value={formData.city}
        onChange={(e) => setFormData({...formData, city: e.target.value, serviceCenter: ''})}
        required
>
  <option value="">Select City</option>
  {cities.map((city) => (
    <option key={city.id} value={city.name}>
      {city.name}
    </option>
  ))}
</select>

          {/* DYNAMIC SERVICE CENTER SELECTION */}
          <label style={styles.label}>Service Center *</label>
          <select 
            style={styles.input}
            value={formData.serviceCenter}
            disabled={!formData.city}
            onChange={(e) => setFormData({...formData, serviceCenter: e.target.value})}
             required
          >
            <option value="">{formData.city ? "Select Service Center" : "Select a city first"}</option>
            {centers.map((center) => (
              <option key={center.id} value={center.name}>{center.name}</option>
            ))}
          </select>

          <button type="submit" style={styles.button}>Confirm Booking</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '50px 20px' },
  card: { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '450px', width: '100%' },
  title: { margin: '0 0 10px 0', color: '#0a3d62', textAlign: 'center' },
  subtitle: { fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  label: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px' },
  button: { padding: '12px', background: '#0a3d62', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' },
  notification: { padding: '12px', borderRadius: '6px', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }
};

export default ServiceBooking;