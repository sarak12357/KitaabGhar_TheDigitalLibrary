import { useEffect, useState } from "react";

function WhatsHot() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=books+novels+authors&sortBy=publishedAt&apiKey=3d8a40ec8451439cbd087508c118be69"
    )
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch((err) => console.error(err));
  }, []);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div style={page}>
      
      {/* 🔥 HEADER */}
      <h1 style={title}>🔥 What’s Hot in Books</h1>

      {/* 🌟 FEATURED ARTICLE */}
      {featured && (
        <div style={featuredCard}>
          <img
            src={featured.urlToImage || fallback}
            alt=""
            style={featuredImg}
          />

          <div style={featuredContent}>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>

            <a href={featured.url} target="_blank" rel="noreferrer">
              Read Full Article →
            </a>
          </div>
        </div>
      )}

      {/* 📚 GRID ARTICLES */}
      <div style={grid}>
        {rest.map((a, i) => (
          <div key={i} style={card}>
            <img
              src={a.urlToImage || fallback}
              alt=""
              style={img}
            />

            <div style={{ padding: "10px" }}>
              <h3>{a.title}</h3>
              <p style={{ fontSize: "14px", color: "#bbb" }}>
                {a.description?.slice(0, 100)}...
              </p>

              <a href={a.url} target="_blank" rel="noreferrer">
                Read →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhatsHot;


// 🎨 STYLES

const fallback =
  "https://via.placeholder.com/400x250?text=No+Image";

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  padding: "40px",
  color: "#fff"
};

const title = {
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "30px"
};

const featuredCard = {
  display: "flex",
  gap: "20px",
  background: "#111827",
  borderRadius: "14px",
  overflow: "hidden",
  marginBottom: "40px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
};

const featuredImg = {
  width: "50%",
  objectFit: "cover"
};

const featuredContent = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px"
};

const card = {
  background: "#111827",
  borderRadius: "12px",
  overflow: "hidden",
  transition: "0.3s",
  cursor: "pointer"
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover"
};