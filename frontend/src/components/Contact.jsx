import { useState } from "react";
export default function Contact() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  message: ""
});

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = () => {
  if (!form.name || !form.email || !form.message) {
    alert("Please fill all fields");
    return;
  }

  console.log("Contact form submitted:", form);

  alert("Message sent successfully!");

  setForm({ name: "", email: "", message: "" });
};
  return (
    <div className="contact-section">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <input 
        name="name"
        placeholder="Name" value={form.name}
        onChange={handleChange} />
        <input 
        name="email"
        placeholder="Email" value={form.email}
        onChange={handleChange} />
        <textarea 
        name="message"
        placeholder="Message" value={form.message}
        onChange={handleChange}/>
        <button onClick={handleSubmit}>Send</button>
      </div>
      </div>
  );
}
