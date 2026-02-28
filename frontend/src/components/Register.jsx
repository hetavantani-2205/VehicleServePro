import axios from "axios";
import { useState, useEffect } from "react";

const API = `${import.meta.env.VITE_API_URL}/api/auth/register`;

export default function Register({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
  setError("");


  if (!name || !email || !password) {
    setError("All fields are required");
    return;
  } 
  if (!email.includes("@")) {
    setError("Invalid email format");
    return;
  } 
  if (password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  } 
  if (!/[A-Z]/.test(password)) {
    setError("Password must contain at least one uppercase letter");
    return;
  } 
  if (!/[a-z]/.test(password)) {
    setError("Password must contain at least one lowercase letter");
    return;
  } 
  if (!/\d/.test(password)) {
    setError("Password must contain at least one number");
    return;
  } 
  if (!/[@$!%*?&]/.test(password)) {
    setError("Password must contain at least one special character");
    return;
  } 

  
  console.log("Validation passed. Sending request...");
  axios.post(API, { name, email, password })
    .then(() => {
      alert("Registration successful");
      goLogin();
    })
    .catch((err) => {
      console.error("Backend Error:", err);
      setError("Registration failed. Please try again later.");
    });
};

useEffect(() => {
  
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: "645510715190-0tl07v4hkijppe2903l30bt9onh2uf3q.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleRegisterBtn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
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

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(res.data));

    goLogin();
  } catch (err) {
    console.error("Google Register Error:", err);
    setError("Google registration failed.");
  }
};
 


  return (

     <div style={styles.container}>

      <div style = {styles.contentWrapper}>


          <div style={styles.titleContainer}>
        <h1 style={styles.mainTitle}>VehicleServePro</h1>
        <p style={styles.subtitle}>Secure Access to Your Garage Dashboard</p>


        </div>




    <div style={styles.container}>
      <div style={styles.card}>
      <h2>Register</h2>

        <div style = {{ marginTop: "20px" }}>
          <div id="googleRegisterBtn"></div>
        </div>
          {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />

      <button onClick={register} style={styles.button}>Register</button>

     

      <p style={{marginTop: "15px"}}>
        Already have an account?
        <span style={styles.link} onClick={goLogin}> Login</span>
      </p>
    </div>
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
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
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