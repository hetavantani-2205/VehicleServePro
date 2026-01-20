import { useState } from "react";

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
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 

      if (data.status === "success") {
        setError("");
        onLogin(data); 
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

       <input
         placeholder="Email"
        value={email}
        onChange={(e) => {
    setEmail(e.target.value);
    localStorage.setItem("email", e.target.value);
  }}
/>


       <input
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

export default Login;
