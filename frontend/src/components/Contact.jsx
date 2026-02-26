import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
    <section className="contact-bento-section">
      <div className="container">
        <div className="section-header-v2">
          <span className="platform-tag">Support Hub</span>
          <h2 className="main-title-clean">Get in <span>Touch</span></h2>
        </div>

        <div className="contact-grid-v2">
          {/* Left Side: Quick Info Bento */}
          <div className="contact-info-stack">
            <div className="bento-card small-card">
              <div className="card-icon">✉️</div>
              <h4>Email Us</h4>
              <p>vehicleservepro@gmail.com</p>
            </div>
            <div className="bento-card small-card accent-card">
              <div className="card-icon">💬</div>
              <h4>WhatsApp</h4>
              <p>+91 99252 03480</p>
            </div>
          </div>

          {/* Right Side: The Glass Form */}
          <div className="bento-card form-card-large">
            <h3>Send a Message</h3>
            <div className="modern-form">
              <div className="form-row">
                <input 
                  className="mgmt-input"
                  name="name"
                  placeholder="Your Name" 
                  value={form.name}
                  onChange={handleChange} 
                />
                <input 
                  className="mgmt-input"
                  name="email"
                  placeholder="Email Address" 
                  value={form.email}
                  onChange={handleChange} 
                />
              </div>
              <textarea 
                className="mgmt-input text-area-v2"
                name="message"
                placeholder="How can we help you?" 
                value={form.message}
                onChange={handleChange}
              />
              <button className="primary-glass-btn send-btn" onClick={handleSubmit}>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}