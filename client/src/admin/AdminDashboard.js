import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const bookRes = await axios.get("http://localhost:5000/api/admin/books");
      const userRes = await axios.get("http://localhost:5000/api/admin/users");
      const activityRes = await axios.get(
        "http://localhost:5000/api/admin/activity",
      );

      setBooks(bookRes.data || []);
      setUsers(userRes.data || []);
      setActivity(activityRes.data || []);
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  // 📊 Stats
  const trendingCount = books.filter((b) => b.isTrending).length;

  return (
    <AdminLayout>
      <h2 style={title}>Admin Dashboard</h2>

      {/* 🔥 STATS */}
      <div style={statsGrid}>
        <div style={card}>
          <h3>Total Books</h3>
          <p style={number}>{books.length}</p>
        </div>

        <div style={card}>
          <h3>Trending</h3>
          <p style={number}>{trendingCount}</p>
        </div>

        <div style={card}>
          <h3>Users</h3>
          <p style={number}>{users.length}</p>
        </div>

        <div style={card}>
          <h3>Total Unlocks</h3>
          <p style={number}>
            {users.reduce((acc, u) => acc + (u.unlockedBooks?.length || 0), 0)}
          </p>
        </div>
      </div>

      {/* 📚 RECENT BOOKS */}
      <section>
        <h3 style={sectionTitle}>Recent Books</h3>
        <div style={bookGrid}>
          {books.slice(0, 5).map((b) => (
            <div key={b._id} style={bookCard}>
              <img
                src={
                  b.cover
                    ? `http://localhost:3000/covers/${b.cover.replace("/covers/", "")}`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                alt={b.title}
                style={img}
              />
              <p style={bookTitle}>{b.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 👤 USERS TABLE */}
      <section>
        <h3 style={sectionTitle}>Users</h3>

        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Credits</th>
              <th style={th}>Unlocked</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.email}</td>
                <td style={td}>{u.credits || 0}</td>
                <td style={td}>{u.unlockedBooks?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 🔓 ACTIVITY */}
      <section>
        {/* <h3 style={sectionTitle}>Recent Activity</h3> */}

        {activity.length === 0 ? (
          <p style={{ color: "#64748b" }}>No activity yet</p>
        ) : (
          <section>
            <h3 style={sectionTitle}>Recent Activity</h3>

            {activity.length === 0 ? (
              <p style={{ color: "#64748b" }}>No activity yet</p>
            ) : (
              <div style={activityGrid}>
                {activity.map((a, i) => (
                  <div key={i} style={activityCard}>
                    <div style={avatar}>{a.user.charAt(0).toUpperCase()}</div>

                    <div>
                      <p style={{ margin: 0 }}>
                        <strong>{a.user}</strong>
                      </p>

                      <p style={{ margin: 0, fontSize: "14px" }}>
                        unlocked{" "}
                        <span style={{ color: "#2563eb" }}>{a.book}</span>
                      </p>

                      <span style={badge}>{a.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </section>
    </AdminLayout>
  );
}

export default AdminDashboard;

/* 🎨 STYLES */

const title = {
  marginBottom: "20px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
  marginBottom: "30px",
};

const card = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  textAlign: "center",
};

const number = {
  fontSize: "24px",
  fontWeight: "bold",
};

const sectionTitle = {
  marginBottom: "10px",
};

const bookGrid = {
  display: "flex",
  gap: "15px",
  marginBottom: "30px",
};

const bookCard = {
  width: "120px",
  textAlign: "center",
};

const img = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "6px",
};

const bookTitle = {
  fontSize: "13px",
  marginTop: "5px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "30px",
  background: "#fff",
};

const th = {
  border: "1px solid #e5e7eb",
  padding: "10px",
  background: "#f9fafb",
  textAlign: "left",
};

const td = {
  border: "1px solid #e5e7eb",
  padding: "10px",
};

const activityList = {
  paddingLeft: "20px",
};

const activityItem = {
  marginBottom: "8px",
};
const activityGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
};

const activityCard = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  background: "#fff",
  padding: "12px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#ff7a00",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
};

const badge = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "2px 8px",
  borderRadius: "6px",
  fontSize: "12px",
  marginTop: "4px",
  display: "inline-block",
};
