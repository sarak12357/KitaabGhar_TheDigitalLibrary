import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={container}>

      {/* BACKGROUND */}
      <div style={overlay}></div>

      {/* POPUP CARD */}
      <div style={card}>
        <h2 style={{ marginBottom: "10px" }}>Welcome Back 👋</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        {/* PASSWORD FIELD */}
        <div style={passwordWrapper}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...input, margin: 0 }}
          />

          <span onClick={() => setShow(!show)} style={eye}>
            {show ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleLogin} style={button}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


// 🎨 STYLES

const container = {
  height: "100vh",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative"
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.5)"
};

const card = {
  position: "relative",
  width: "320px",
  padding: "25px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  background: "rgba(255, 255,255,255,0.9)",
  color: "#000",
  fontSize: "14px"
};

const passwordWrapper = {
  position: "relative"
};

const eye = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};

const button = {
  padding: "10px",
  background: "#ff7a00",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer"
};