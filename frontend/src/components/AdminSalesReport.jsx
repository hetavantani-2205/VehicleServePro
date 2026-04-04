import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

export default function AdminSalesReport() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Admin Dashboard...</h2>;
  }

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h2>Welcome Admin 👨‍💼</h2>
        <p>Monitor all system activity in real-time</p>
      </div>

      {/* CARDS */}
      <div className="admin-grid">

        <div className="admin-card">
          <h4>Total Users</h4>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="admin-card">
          <h4>Total Bookings</h4>
          <p>{stats.totalBookings}</p>
        </div>

        <div className="admin-card">
          <h4>Total Revenue</h4>
          <p>₹{stats.totalRevenue}</p>
        </div>

        <div className="admin-card success">
          <h4>Completed</h4>
          <p>{stats.completed}</p>
        </div>

        <div className="admin-card warning">
          <h4>In Progress</h4>
          <p>{stats.inProgress}</p>
        </div>

        <div className="admin-card danger">
          <h4>Pending</h4>
          <p>{stats.pending}</p>
        </div>

      </div>

      {/* OVERVIEW SECTION */}
      <div className="admin-overview">

        <div className="overview-box">
          <h3>System Overview</h3>
          <p>Total Services Processed: {stats.totalBookings}</p>
          <p>Active Services: {stats.inProgress}</p>
        </div>

        <div className="overview-box">
          <h3>Revenue Insights</h3>
          <p>Total Earnings: ₹{stats.totalRevenue}</p>
          <p>Completed Jobs: {stats.completed}</p>
        </div>

      </div>

    </div>
  );
}