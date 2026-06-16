function PopupMessage({ message, onClose }) {
  return (
    <div style={overlay}>
      <div style={modal}>
        <p style={text}>{message}</p>

        <button onClick={onClose} style={btn}>
          OK
        </button>
      </div>
    </div>
  );
}

export default PopupMessage;



// 🎨 STYLES

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3000
};

const modal = {
  background: "#1e293b", // dark slate
  padding: "30px",
  borderRadius: "16px",
  color: "white",
  textAlign: "center",
  width: "320px",
  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
  animation: "fadeIn 0.25s ease"
};

const text = {
  fontSize: "16px",
  lineHeight: "1.5"
};

const btn = {
  marginTop: "20px",
  padding: "10px 18px",
  background: "#f97316", // 🔥 YOUR ORANGE
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "500",
  transition: "0.3s",
};