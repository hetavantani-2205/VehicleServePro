import { useState } from "react";
import axios from "axios";

export default function Feedback({ user }) { 
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submitFeedback = async () => {
    if (rating === 0 || comment.trim() === "") {
      setMsg("❌ Please provide a rating and a comment.");
      return;
    }

   
    const feedbackData = {
      userName: user?.name || "Anonymous",
      userEmail: user?.email || "guest@vsp.com",
      rating: rating,
      comment: comment
     
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/feedback`, feedbackData);
      
      if (response.status === 200 || response.status === 201) {
        setMsg("✅ Feedback stored in database!");
        setRating(0);
        setComment("");
        setTimeout(() => setMsg(""), 4000);
      }
    } catch (err) {
      console.error("Database Error:", err.response?.data || err.message);
      setMsg("⚠️ Server Error: Check Backend Console.");
    }
  };

  return (
    <section className="feedback-section-v2">
      <div className="bento-card feedback-container">
        <div className="mgmt-header">
          <span className="ai-badge">Secure Feedback</span>
          <h2>Customer <span>Insights</span></h2>
        </div>

        <div className="star-rating-box">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={n <= rating ? "star-v2 active" : "star-v2"}
              onClick={() => setRating(n)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="feedback-inputs">
          <textarea
            className="mgmt-input text-area-v2"
            placeholder="Share your thoughts with our engineering team..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="primary-glass-btn" onClick={submitFeedback}>
            Send to Database
          </button>
        </div>

        {msg && <div className={`feedback-toast ${msg.includes('❌') || msg.includes('⚠️') ? 'error' : 'success'}`}>{msg}</div>}
      </div>
    </section>
  );
}