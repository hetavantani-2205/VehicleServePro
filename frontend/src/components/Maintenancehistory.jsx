import { useState } from "react";

function MaintenanceHistory() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [records, setRecords] = useState([]);

  const dummyData = {
    "GJ12P3929": [
      { date: "10 Jan 2024", service: "Oil Change", cost: 1200 },
      { date: "05 Aug 2023", service: "Brake Repair", cost: 2500 }
    ],
    "MH43V2787": [
      { date: "15 Feb 2024", service: "General Service", cost: 1800 }
    ],
    "GJ03KP5291": [
      { date: "10 march 2024", service: "Oil Change", cost: 1200 },
      { date: "05 Aug 2023", service: "Brake Repair", cost: 2500 }
    ],
  };

  const handleSearch = () => {
    setRecords(dummyData[vehicleNo] || []);
  };

  return (
    <div className="section-content">
      <h2>Maintenance History</h2>

      <input
        placeholder="Enter Vehicle Number (e.g. GJ01AB1234)"
        value={vehicleNo}
        onChange={(e) => setVehicleNo(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {records.length > 0 ? (
        <table style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.service}</td>
                <td>{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        vehicleNo && <p style={{ marginTop: "15px" }}>No records found.</p>
      )}
    </div>
  );
}

export default MaintenanceHistory;
