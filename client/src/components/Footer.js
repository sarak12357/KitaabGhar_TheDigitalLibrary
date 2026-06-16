import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={footer}>
      <div style={container}>
        
        {/* LEFT */}
        <div>
          <h2 style={logo}>KitaabGhar</h2>
          <p style={desc}>
            Discover, unlock and enjoy books with a modern reading experience.
          </p>

          {/* 🌐 SOCIAL ICONS */}
          <div style={icons}>
            <FaGithub style={icon} />
            <FaLinkedin style={icon} />
            <FaInstagram style={icon} />
          </div>
        </div>

        {/* CENTER */}
        <div>
          <h4 style={heading}>Explore</h4>
          <p style={link} onClick={() => navigate("/")}>Home</p>
          <p style={link} onClick={() => navigate("/explore")}>What's Hot</p>
          <p style={link} onClick={() => navigate("/quiz")}>Quiz</p>
        </div>

        {/* RIGHT */}
        <div>
          <h4 style={heading}>More</h4>
          <p style={link} onClick={() => navigate("/quotes")}>Quotes</p>
          <p style={link} onClick={() => navigate("/readlist")}>My Readlist</p>
          <p style={link}>Contact</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={bottom}>
        © {new Date().getFullYear()} KitaabGhar. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

//////////////////////////////////////////////////////
// 🎨 STYLES
//////////////////////////////////////////////////////

const footer = {
  background: "linear-gradient(to right, #fff7ed, #ffedd5)",
  marginTop: "60px",
  paddingTop: "50px",
  borderTop: "1px solid #f1f5f9",
};

const container = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 8%",
  flexWrap: "wrap",
  gap: "40px",
};

const logo = {
  color: "#f97316",
  marginBottom: "10px",
  fontSize: "22px",
};

const desc = {
  color: "#64748b",
  maxWidth: "260px",
  fontSize: "14px",
};

const heading = {
  marginBottom: "12px",
  color: "#1e293b",
};

const link = {
  cursor: "pointer",
  color: "#64748b",
  marginBottom: "8px",
  transition: "0.3s",
};

const icons = {
  display: "flex",
  gap: "12px",
  marginTop: "15px",
};

const icon = {
  fontSize: "18px",
  color: "#475569",
  cursor: "pointer",
  transition: "0.3s",
};

const bottom = {
  textAlign: "center",
  marginTop: "40px",
  padding: "15px",
  borderTop: "1px solid #e2e8f0",
  color: "#94a3b8",
  fontSize: "13px",
};