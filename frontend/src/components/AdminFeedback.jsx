import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`);
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="admin-feedback-panel">
      <div className="mgmt-header">
        <span className="ai-badge">Admin Review</span>
        <h2>Client <span>Testimonials</span></h2>
      </div>

      <div className="feedback-list-wrapper">
        {feedbacks.length > 0 ? feedbacks.map((f, index) => (
          <div key={index} className="vehicle-item-row-v2 feedback-row">
            <div className="v-details">
              <span className="v-owner">{f.userName} <small>({f.userEmail})</small></span>
              <div className="admin-stars">{"★".repeat(f.rating)}{"☆".repeat(5-f.rating)}</div>
              <p className="admin-comment">"{f.comment}"</p>
            </div>
            <div className="v-plate-box">
              <span className="v-plate">{new Date(f.date).toLocaleDateString()}</span>
            </div>
          </div>
        )) : <p>No feedback received yet.</p>}
      </div>
    </div>
  );
}