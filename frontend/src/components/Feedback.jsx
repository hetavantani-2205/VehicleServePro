import { useState } from "react";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submitFeedback = () => {
    if (rating === 0 || comment.trim() === "") {
      setMsg("❌ Please provide a rating and a comment.");
      return;
    }
    console.log("Feedback Submitted:", { rating, comment });
    setMsg("✅ Thank you for your feedback!");
    setRating(0);
    setComment("");
    setTimeout(() => setMsg(""), 3000); 
  };

  return (
    <section className="feedback-bento-section">
      <div className="container">
        <div className="bento-card feedback-card-v2">
          <div className="card-header-clean">
            <span className="platform-tag">Community</span>
            <h2 className="main-title-clean">Customer <span>Feedback</span></h2>
            <p>Your insights drive our precision.</p>
          </div>

          <div className="star-rating-v2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className={n <= rating ? "star active" : "star"}
                onClick={() => setRating(n)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="feedback-form-group">
            <textarea
              className="mgmt-input text-area-v2"
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            <button className="primary-glass-btn feedback-submit-btn" onClick={submitFeedback}>
              Submit Review
            </button>
          </div>

          {msg && (
            <div className={`feedback-toast ${msg.includes('❌') ? 'error' : 'success'}`}>
              {msg}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}