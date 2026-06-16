import { useState } from "react";

function Hero({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div style={container}>
      <div style={overlay}></div>

      {/* ✨ Floating Glow */}
      <div style={glow}></div>

      <div style={content}>
        <h1 style={title}>
          Discover Your Next <span style={highlight}>Favorite Book</span> 📚
        </h1>

        <p style={subtitle}>
          Dive into stories, explore authors, and unlock worlds
        </p>

        <div style={searchWrapper}>
          <div style={searchBox}>
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={query}
              
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch(e.target.value);
              }}
              style={input}
            />

            <button style={btn}>🔍</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

const container = {
  position: "relative",
  height: "340px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  // 📚 BOOK BACKGROUND
  backgroundImage:
    "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(135deg, rgba(255,247,237,0.9), rgba(255,237,213,0.9))",
};

const glow = {
  position: "absolute",
  width: "300px",
  height: "300px",
  background: "rgba(249,115,22,0.25)",
  borderRadius: "50%",
  filter: "blur(100px)",
  animation: "float 6s ease-in-out infinite",
};

const content = {
  position: "relative",
  textAlign: "center",
  zIndex: 2,
};

const title = {
  fontSize: "36px",
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: "10px",
};

const highlight = {
  color: "#f97316",
};

const subtitle = {
  color: "#475569",
  marginBottom: "25px",
  fontSize: "16px",
};

const searchWrapper = {
  display: "flex",
  justifyContent: "center",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(12px)",
  borderRadius: "50px",
  padding: "6px",
  width: "420px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
};

const input = {
  flex: 1,
  padding: "12px 16px",
  border: "none",
  outline: "none",
  borderRadius: "50px",
  fontSize: "14px",
  background: "transparent",
  color: "#1e293b",
};

const btn = {
  background: "#f97316",
  border: "none",
  padding: "10px 14px",
  borderRadius: "50%",
  cursor: "pointer",
  color: "white",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
