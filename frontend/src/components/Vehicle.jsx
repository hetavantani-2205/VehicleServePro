import { useEffect, useState } from "react";
import axios from "axios";
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
  };

  const deleteVehicle = (id) => {
    axios.delete(`${API_URL}/${id}`).then(loadVehicles);
  };

  return (
    <section id="crud">
    <div className="section-content">
      <h2>Vehicle Management</h2>

      <input value={owner} onChange={e => setOwner(e.target.value)} placeholder="Owner" />
      <input value={model} onChange={e => setModel(e.target.value)} placeholder="Model" />
      <input value={number} onChange={e => setNumber(e.target.value)} placeholder="Number" />

      <button onClick={saveVehicle}>
        {editId ? "Update" : "Add"}
      </button>

      <table>
        <thead>
          <tr><th>Serial No.</th><th>Owner</th><th>Model</th><th>Number</th><th>Action</th></tr>
        </thead>
        <tbody>
          {vehicles.map((v,index) => (
            <tr key={v.id}>
              <td>{index + 1}</td>
              <td>{v.ownerName}</td>
              <td>{v.vehicleModel}</td>
              <td>{v.vehicleNumber}</td>
              <td>
                <button onClick={() => editVehicle(v)}>Edit</button>
                <button onClick={() => deleteVehicle(v.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </section>
  )
}
