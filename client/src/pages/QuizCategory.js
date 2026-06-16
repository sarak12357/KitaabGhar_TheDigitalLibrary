import { useNavigate } from "react-router-dom";

function QuizCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Harry Potter",
      key: "harrypotter",
      color: "#7c3aed"
    },
    {
      name: "Classics",
      key: "classics",
      color: "#f59e0b"
    },
    {
      name: "Romance",
      key: "romance",
      color: "#ec4899"
    },
    {
      name: "Mystery",
      key: "mystery",
      color: "#10b981"
    }
  ];

  return (
    <div style={pageBg}>
      <h1 style={{ color: "black", marginBottom: "30px", fontSize: "25px" }}>
        🎯 Choose Your Quiz
      </h1>

      <div style={grid}>
        {categories.map((cat) => (
          <div
            key={cat.key}
            style={{ ...card, background: cat.color }}
            onClick={() => navigate(`/quiz/${cat.key}`)}
          >
            <h2>{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizCategory;


// 🎨 STYLES

const pageBg = {
  minHeight: "100vh",
background: "linear-gradient(135deg, #fff7ed, #ffedd5, #fde68a)",
color: "#1f2937",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 250px)",
  gap: "20px"
};

const card = {
  height: "150px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "18px",
  cursor: "pointer",
  transition: "0.3s",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
};