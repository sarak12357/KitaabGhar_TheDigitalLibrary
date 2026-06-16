import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#0f172a",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ color: "#f97316" }}>KitaabGhar Admin</h2>

        <p><Link to="/admin" style={linkStyle}>Dashboard</Link></p>
        <p><Link to="/admin/add" style={linkStyle}>Add Book</Link></p>
        <p><Link to="/admin/manage" style={linkStyle}>Manage Books</Link></p>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        background: "#f1f5f9",
        padding: "30px"
      }}>
        {children}
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "10px 0"
};

export default AdminLayout;