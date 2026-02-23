import { useEffect, useState } from "react";
import axios from "axios";


const API_URL = `${import.meta.env.VITE_API_URL}/api/vehicles`;

export default function VehicleCrud() {
  const [vehicles, setVehicles] = useState([]);
  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await axios.get(API_URL);
      setVehicles(res.data);
    } catch (err) {
      console.error("Error loading vehicles:", err);
    }
  };

  const saveVehicle = async () => {
    // ERROR FIX: Prevent empty submissions
    if (!owner || !model || !number) {
      alert("Please fill all fields before saving.");
      return;
    }

    const data = { ownerName: owner, vehicleModel: model, vehicleNumber: number };

    try {
      if (!editId) {
        // ERROR FIX: Wait for the post to finish before reloading
        await axios.post(API_URL, data);
      } else {
        await axios.put(`${API_URL}/${editId}`, data);
        setEditId(null);
      }
      
      // Reset form and reload
      setOwner(""); setModel(""); setNumber("");
      loadVehicles();
    } catch (err) {
      alert("Failed to save vehicle. Is the backend running?");
    }
  };

  const editVehicle = (v) => {
    setEditId(v.id);
    setOwner(v.ownerName);
    setModel(v.vehicleModel);
    setNumber(v.vehicleNumber);
  };

  const deleteVehicle = async (id) => {
    // SAFETY: Add a confirmation before deleting
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        loadVehicles();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

   return (
    <div className="page-wrapper">
      <div className="page-content">
        <section className="section-content">
          <div className="mgmt-header">
            <h2>Vehicle Management</h2>
            <p>Manage and track all registered vehicles in the system.</p>
          </div>

          {/* Optimized Input Bar - Matches your app's horizontal action bars */}
          <div className="add-vehicle-bar">
            <input 
              className="mgmt-input"
              value={owner} 
              onChange={e => setOwner(e.target.value)} 
              placeholder="Owner Name" 
            />
            <input 
              className="mgmt-input"
              value={model} 
              onChange={e => setModel(e.target.value)} 
              placeholder="Model (e.g. Thar)" 
            />
            <input 
              className="mgmt-input"
              value={number} 
              onChange={e => setNumber(e.target.value)} 
              placeholder="Vehicle Number" 
            />

            <button 
              className={editId ? "add-btn-main update-mode" : "add-btn-main"} 
              onClick={saveVehicle}
            >
              {editId ? "Update" : "+ Add Vehicle"}
            </button>
            
            {editId && (
              <button 
                className="detail-btn" 
                onClick={() => {setEditId(null); setOwner(""); setModel(""); setNumber("");}}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            )}
          </div>

          {/* Modern List View - Replaces the <table> for better mobile responsiveness */}
          <div className="vehicle-list-wrapper">
            {vehicles.length > 0 ? (
              vehicles.map((v, index) => (
                <div key={v.id || index} className="vehicle-item-row">
                  <div className="v-id">{index + 1}</div>
                  
                  <div className="v-details">
                    <span className="v-owner">{v.ownerName}</span>
                    <span className="v-model">{v.vehicleModel}</span>
                  </div>

                  <div className="v-plate-box">
                    <span className="v-plate">{v.vehicleNumber}</span>
                  </div>

                  <div className="v-actions">
                    <button className="edit-icon-btn" onClick={() => editVehicle(v)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-icon-btn" onClick={() => deleteVehicle(v.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No vehicles registered. Use the bar above to add your first vehicle.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );

}
 