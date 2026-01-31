import { useState } from "react";

export default function Feedback() {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  const submitFeedback = () => {

    if (rating === 0 || comment.trim() === "") {
      setMsg("❌ Please give appropriate feedback.");
      return;
    }

    
    console.log("Feedback :", { rating, comment });

    setMsg("✅ Thank you for your feedback!");
    setRating(0);
    setComment("");
  };

  return (
    <div style={card}>
      <h2 style={{color:"#0a3d62"}}>Customer Feedback</h2>
      <p style={{color:"#666"}}>Help us improve our service</p>

      <div style={{margin:"15px 0"}}>
        {[1,2,3,4,5].map(n => (
          <span
            key={n}
            onClick={() => setRating(n)}
            style={{
              fontSize:"28px",
              cursor:"pointer",
              color: n <= rating ? "#f4b400" : "#ccc"
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Write your feedback..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={input}
      />

      <button onClick={submitFeedback} style={btn}>
        Submit Feedback
      </button>

      {msg && <p style={{marginTop:"10px"}}>{msg}</p>}
    </div>
  );
}

const card = {
  maxWidth:"500px",
  margin:"auto",
  background:"white",
  padding:"30px",
  borderRadius:"12px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.1)"
};

const input = {
  width:"100%",
  minHeight:"100px",
  padding:"10px",
  borderRadius:"8px",
  border:"1px solid #ccc"
};

const btn = {
  marginTop:"15px",
  padding:"10px 18px",
  border:"none",
  borderRadius:"8px",
  background:"#0a3d62",
  color:"white",
  cursor:"pointer"
};