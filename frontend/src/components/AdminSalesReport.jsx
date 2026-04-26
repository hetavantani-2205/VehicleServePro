import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminSalesReport() {
  const [stats, setStats] = useState(null);   
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/stats`)
      .then((res) => {
        console.log("API DATA:", res.data); 
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return <h2 style={{ textAlign: "center" }}>Loading Admin Dashboard...</h2>;
  }

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Welcome Hetav 👨‍💼</h2>
        <p>Monitor all system activity in real-time</p>
      </div>

      {/* CARDS */}
      <div className="admin-grid">

        <div className="admin-card">
          <h4>Total Users</h4>
          <p>{stats.totalUsers ?? 0}</p>
        </div>

        <div className="admin-card">
          <h4>Total Bookings</h4>
          <p>{stats.totalBookings ?? 0}</p>
        </div>

        <div className="admin-card">
          <h4>Total Revenue</h4>
          <p>₹{stats.totalRevenue ?? 0}</p>
        </div>

        <div className="admin-card success">
          <h4>Completed</h4>
          <p>{stats.completed ?? 0}</p>
        </div>

        <div className="admin-card warning">
          <h4>In Progress</h4>
          <p>{stats.inProgress ?? 0}</p>
        </div>

        <div className="admin-card danger">
          <h4>Pending</h4>
          <p>{stats.pending ?? 0}</p>
        </div>

      </div>

      {/* OVERVIEW */}
      <div className="admin-overview">

        <div className="overview-box">
          <h3>System Overview</h3>
          <p>Total Services Processed: {stats.totalBookings ?? 0}</p>
          <p>Active Services: {stats.inProgress ?? 0}</p>
        </div>

        <div className="overview-box">
          <h3>Revenue Insights</h3>
          <p>Total Earnings: ₹{stats.totalRevenue ?? 0}</p>
          <p>Completed Jobs: {stats.completed ?? 0}</p>
        </div>

      </div>

    </div>
  );
}