import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("");
  const [hoverLogout, setHoverLogout] = useState(false);

  const getStyle = (name) => ({
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: hovered === name ? "#ff7a00" : "#333",
    transform: hovered === name ? "scale(1.1)" : "scale(1)",
    fontWeight: hovered === name ? "600" : "500",
  });

  return (
    <div style={navbar}>
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        style={{
          color: "#ff7a00",
          fontWeight: "800",
          fontSize: "28px",
          cursor: "pointer",
        }}
      >
        KitaabGhar
      </h1>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <span
          style={getStyle("explore")}
          onMouseEnter={() => setHovered("explore")}
          onMouseLeave={() => setHovered("")}
          onClick={() => navigate("/explore")}
        >
          What's Hot 🔥
        </span>

        <span
          style={getStyle("quotes")}
          onMouseEnter={() => setHovered("quotes")}
          onMouseLeave={() => setHovered("")}
          onClick={() => navigate("/quotes")}
        >
          Quotes
        </span>

        <span
          style={getStyle("quiz")}
          onMouseEnter={() => setHovered("quiz")}
          onMouseLeave={() => setHovered("")}
          onClick={() => navigate("/quiz")}
        >
          Quiz
        </span>

        {!user && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}

        {user && (
          <>
            <span style={creditBox}>Credits: {user.credits}</span>

            <span>Hi, {user.name}</span>

            <button
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              onClick={() => {
                localStorage.clear();
                setUser(null);
                navigate("/");
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: hoverLogout ? "#ef4444" : "#f87171",
                color: "white",
                transform: hoverLogout ? "scale(1.05)" : "scale(1)",
                boxShadow: hoverLogout
                  ? "0 4px 12px rgba(239,68,68,0.4)"
                  : "none",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "18px 60px",
  background: "#ffffffcc",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid #eee",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const creditBox = {
  background: "#ffe4c4",
  padding: "6px 12px",
  borderRadius: "10px",
  fontWeight: "600",
};
