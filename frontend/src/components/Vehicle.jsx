import { useEffect, useState } from "react";
import axios from "axios";
// Ensure you have the CSS provided below in your App.css or a dedicated Vehicle.css
import "./App.css"; 

const API_URL = "http://localhost:8081/api/vehicles";

export default function VehicleCrud() {
  const [vehicles, setVehicles] = useState([]);
  const [owner, setOwner] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    axios.get(API_URL).then(res => setVehicles(res.data));
  };

  const saveVehicle = () => {
    if (!owner || !model || !number) {
      alert("Please fill in all fields");
      return;
    }

    const data = { ownerName: owner, vehicleModel: model, vehicleNumber: number };

    if (!editId) {
      axios.post(API_URL, data).then(loadVehicles);
    } else {
      axios.put(`${API_URL}/${editId}`, data).then(() => {
        setEditId(null);
        loadVehicles();
      });
    }

    setOwner(""); setModel(""); setNumber("");
  };

  const editVehicle = (v) => {
    setEditId(v.id);
    setOwner(v.ownerName);
    setModel(v.vehicleModel);
    setNumber(v.vehicleNumber);
    // Optional: Scroll to top so user sees the inputs are populated
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteVehicle = (id) => {
    if(window.confirm("Are you sure you want to delete this vehicle?")) {
        axios.delete(`${API_URL}/${id}`).then(loadVehicles);
    }
  };

  return (
    <div className="vehicle-mgmt-container">
      {/* Header Section */}
      <div className="mgmt-header">
        <h2>🚗 Vehicle Fleet Management</h2>
        <p>Registry of all vehicles under your service profile.</p>
      </div>

      {/* Modern Input Bar */}
      <div className="add-vehicle-bar">
        <input 
          value={owner} 
          onChange={e => setOwner(e.target.value)} 
          placeholder="Owner Name" 
          className="mgmt-input"
        />
        <input 
          value={model} 
          onChange={e => setModel(e.target.value)} 
          placeholder="Model (e.g. BMW X5)" 
          className="mgmt-input"
        />
        <input 
          value={number} 
          onChange={e => setNumber(e.target.value)} 
          placeholder="Plate Number" 
          className="mgmt-input"
        />
        <button 
          className={editId ? "add-btn-main update-mode" : "add-btn-main"} 
          onClick={saveVehicle}
        >
          {editId ? "Update Vehicle" : "+ Add Vehicle"}
        </button>
      </div>

      {/* Modern List View (Replacing the Table) */}
      <div className="vehicle-list-wrapper">
        {vehicles.length > 0 ? (
          vehicles.map((v, index) => (
            <div key={v.id} className="vehicle-item-row">
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
            <p>No vehicles registered yet. Use the bar above to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
}