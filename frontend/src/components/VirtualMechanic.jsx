import { useState } from "react";

const VirtualMechanic = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!input) return;
    setLoading(true);
    
    const newChat = [...chat, { role: "user", text: input }];
    setChat(newChat);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/diagnose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom: input }),
      });
      const data = await response.json();
      
    

      setChat([...newChat, { role: "bot", text: data.advice }]);
      setInput("");
    } catch (err) {
      console.error("AI Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "15px", background: "#f9f9f9" }}>
      <h3 style={{ color: "#0a3d62" }}>🛠️ AI Virtual Mechanic</h3>
      <div style={{ height: "300px", overflowY: "auto", marginBottom: "15px", padding: "10px", background: "#fff", borderRadius: "10px" }}>
       {chat.map((msg, i) => (
  <div
    key={i}
    style={{
      display: "flex",
      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
      margin: "8px 0"
    }}
  >
    <div
      style={{
        maxWidth: "75%",
        padding: "10px 14px",
        borderRadius: "18px",
        background: msg.role === "user" ? "#0a3d62" : "#f1f1f1",
        color: msg.role === "user" ? "#fff" : "#333",
        fontSize: "14px",
        lineHeight: "1.5"
      }}
    >
      {msg.text}
    </div>
  </div>
))}
        {loading && <p>Mechanic is thinking...</p>}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input 
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. My brakes are squeaking..."
        />
        <button onClick={handleDiagnose} style={{ background: "#0a3d62", color: "white", padding: "10px 20px" }}>Ask AI</button>
      </div>
    </div>
  );
};

export default VirtualMechanic;