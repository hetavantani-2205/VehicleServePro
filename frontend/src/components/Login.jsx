import { useState, useEffect } from "react";
import axios from "axios";

function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
const [password, setPassword] = useState(localStorage.getItem("password") || "");

  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!email && !password) {
      setError("Please enter email and password");
      return;
    }
    if (!email) {
      setError("Please enter email");
      return;
    }
    if (!password) {
      setError("Please enter password");
      return;
    }

    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 

      if (data.status === "success") {
        setError("");
        onLogin(data.user || data); 
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  useEffect(() => {
  
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 350,
      }
    );
  }
}, []);

const handleGoogleResponse = async (response) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/google`,
      { token: response.credential }
    );

    onLogin(res.data);
  } catch (err) {
    console.error("Google Login Error:", err);
    setError("Google login failed");
  }
};

  return (
    <div style={styles.container}>

      <div style = {styles.contentWrapper}>


          <div style={styles.titleContainer}>
        <h1 style={styles.mainTitle}>VehicleServePro</h1>
        <p style={styles.subtitle}>Secure Access to Your Garage Dashboard</p>


        </div>

       <div style={styles.card}>
        <h2>Login</h2>

        <div style = {{ marginBottom: "20px" }}>
          <div id="googleBtn"></div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

       <input
         style={styles.input}
         placeholder="Email"
        value={email}
        onChange={(e) => {
    setEmail(e.target.value);
    localStorage.setItem("email", e.target.value);
  }}
/>


       <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value);
  }}
/>


        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={goRegister}>
            Register
          </span>
        </p>
        </div>
      </div>
    </div>
  );
}

const styles = {

  contentWrapper: {
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  },

    titleContainer: {
  marginBottom: "30px", 
  textAlign: "center",
},
mainTitle: {
  fontSize: "2.5rem",
  fontWeight: "800",
  color: "#ffffff", 
  textShadow: "0 2px 10px rgba(0,0,0,0.3)", 
  margin: "0",
  letterSpacing: "-1px",
},
subtitle: {
  fontSize: "1rem",
  color: "rgba(255, 255, 255, 0.8)",
  marginTop: "5px",
},

 container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
card: {
    background: 'rgba(255, 255, 255, 0.85)', 
    backdropFilter: 'blur(12px)',           
    WebkitBackdropFilter: 'blur(12px)',    
    border: '1px solid rgba(255, 255, 255, 0.3)', 
    padding: "40px",
    borderRadius: "20px",                  
    width: "380px",                        
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)", 
    transition: "transform 0.3s ease",      
},
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  inputFocus: {

    borderColor: '#1e90ff',
    boxShadow: '0 0 8px rgba(30, 144, 255, 0.2)',
    outline: 'none',
},

  button: {
    width: "100%",
    padding: "10px",
    background: "#0a3d62",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  link: {
    color: "#1e90ff",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
