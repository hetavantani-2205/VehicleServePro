import axios from "axios";
import { useState } from "react";

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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if(!/[A-Z]/.test(password))
    {
      setError("Password must contain at least one uppercase letter");
    }
     if(!/[a-z]/.test(password))
    {
      setError("Password must contain at least one lowercase letter");
    }
     if(!/\d/.test(password))
     {
        setError("Password must contain at least one number");
     }
     if (!/[@$!%*?&]/.test(password))
     {
       
        setError("Password must contain at least one special character");
        return;
     }

   axios.post(API, {
      name,
      email,
      password
    }).then(() => {
      alert("Registration successful");
      goLogin();
    })
       .catch(() => setError("Registration failed"));
  };

 const googleLogin = () => {
  window.google.accounts.id.initialize({
    client_id: "645510715190-tbj3q0l1p4nqmg4055nbk0rlf6os0bm4.apps.googleusercontent.com",
    callback: handleGoogleResponse,
  });

  window.google.accounts.id.prompt();
};

const handleGoogleResponse = (response) => {
  axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
    token: response.credential
  }).then(res => {
    localStorage.setItem("loggedIn", "true");
    onLogin();
  });
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
      <h2>Register</h2>

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
   
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    background: "#0a3d62",
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