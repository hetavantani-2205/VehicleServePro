import React, { useState, useEffect } from "react";

const AdminSalesReport = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/api/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching report:", err));
  }, []);

  if (loading) return <div style={{ padding: "50px", textAlign: "center" }}><h3>Generating Report...</h3></div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Sales & Revenue Report</h2>

      {/* KPI Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <p style={styles.label}>Total Revenue</p>
          <h2 style={{ ...styles.value, color: "#27ae60" }}>
            ₹{stats.totalRevenue?.toLocaleString() || 0}
          </h2>
        </div>
        <div style={styles.card}>
          <p style={styles.label}>Total Bookings</p>
          <h2 style={{ ...styles.value, color: "#2980b9" }}>{stats.totalBookings}</h2>
        </div>
      </div>

      <div style={styles.tableSection}>
        <h3>Revenue by Service Type</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th>Service</th>
              <th>Bookings</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stats.serviceBreakdown.map((row, index) => (
              <tr key={index} style={styles.tableRow}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>₹{row[2]?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px", maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial" },
  title: { color: "#0a3d62", marginBottom: "30px" },
  statsGrid: { display: "flex", gap: "20px", marginBottom: "40px" },
  card: { flex: 1, padding: "20px", background: "white", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", textAlign: "center" },
  label: { color: "#666", fontSize: "14px", margin: "0" },
  value: { fontSize: "32px", margin: "10px 0" },
  tableSection: { background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" },
  table: { width: "100%", borderCollapse: "collapse" },
  tableHeader: { background: "#0a3d62", color: "white", textAlign: "left" },
  tableRow: { borderBottom: "1px solid #eee" }
};

export default AdminSalesReport;