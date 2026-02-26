import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/vehicles`;

export default function VehicleCrud({ user }) { 
  const [vehicles, setVehicles] = useState([]);
  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [editId, setEditId] = useState(null);

  
  const isMechanic = user?.role?.toUpperCase() === "MECHANIC" || user?.role?.toUpperCase() === "ADMIN";

  useEffect(() => {
    if (isMechanic) loadVehicles();
  }, [isMechanic]);

  const loadVehicles = async () => {
    try {
      const res = await axios.get(API_URL);
      setVehicles(res.data);
    } catch (err) {
      console.error("Error loading vehicles:", err);
    }
  };

  const saveVehicle = async () => {
    if (!owner || !model || !number) {
      alert("Please fill all fields before saving.");
      return;
    }
    const data = { ownerName: owner, vehicleModel: model, vehicleNumber: number };
    try {
      if (!editId) {
        await axios.post(API_URL, data);
      } else {
        await axios.put(`${API_URL}/${editId}`, data);
        setEditId(null);
      }
      setOwner(""); setModel(""); setNumber("");
      loadVehicles();
    } catch (err) {
      alert("Failed to save vehicle. Is the backend running?");
    }
  };

  const deleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadVehicles();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // 2. RESTRICTED ACCESS VIEW
  if (!isMechanic) {
    return (
      <div className="restricted-access-v2">
        <div className="bento-card warning-card">
          <div className="card-icon">🔐</div>
          <h3>Mechanic Portal Only</h3>
          <p>Access to Vehicle Management is restricted to authorized personnel. Please contact your administrator if you believe this is an error.</p>
          <button className="primary-glass-btn" onClick={() => window.location.reload()}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <section className="section-content">
          <div className="mgmt-header">
            <span className="ai-badge">Mechanic Hub</span>
            <h2 className="main-title-clean">Vehicle <span>Management</span></h2>
            <p>Direct database access for service registration and tracking.</p>
          </div>

          <div className="add-vehicle-bar-v2">
            <input className="mgmt-input" value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner Name" />
            <input className="mgmt-input" value={model} onChange={e => setModel(e.target.value)} placeholder="Model (e.g. Thar)" />
            <input className="mgmt-input" value={number} onChange={e => setNumber(e.target.value)} placeholder="Vehicle Number" />
            <button className={editId ? "primary-glass-btn update-mode" : "primary-glass-btn"} onClick={saveVehicle}>
              {editId ? "Update" : "+ Add Vehicle"}
            </button>
          </div>

          <div className="vehicle-list-wrapper">
            {vehicles.map((v, index) => (
              <div key={v.id || index} className="vehicle-item-row-v2">
                <div className="v-id">#{index + 1}</div>
                <div className="v-details">
                  <span className="v-owner">{v.ownerName}</span>
                  <span className="v-model">{v.vehicleModel}</span>
                </div>
                <div className="v-plate-box">
                  <span className="v-plate">{v.vehicleNumber}</span>
                </div>
                <div className="v-actions">
                  <button className="edit-mini-btn" onClick={() => {
                    setEditId(v.id); setOwner(v.ownerName); setModel(v.vehicleModel); setNumber(v.vehicleNumber);
                  }}>✏️</button>
                  <button className="delete-mini-btn" onClick={() => deleteVehicle(v.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}