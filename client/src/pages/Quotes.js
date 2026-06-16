import React, { useState, useContext } from "react";
import quotesData from "../data/quotesData";
import BookModal from "../components/BookModal";
import { UserContext } from "../context/UserContext";
import LoginModal from "../components/LoginModal";

function Quotes() {
  const { user } = useContext(UserContext);

  const [current, setCurrent] = useState(
    quotesData[Math.floor(Math.random() * quotesData.length)]
  );

  const [selectedBook, setSelectedBook] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const nextQuote = () => {
    const random = quotesData[Math.floor(Math.random() * quotesData.length)];
    setCurrent(random);
  };

  // 🔥 VIEW BOOK
  const handleViewBook = () => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    setSelectedBook({
      title: current.book,
      author: current.author,
      synopsis: current.synopsis || "Preview from Quotes section",
      cover: current.cover,
      _id: current._id || null, // ❗ no random id
    });
  };

  return (
    <div style={page}>
      <div style={card}>
        <p style={quote}>“{current.text}”</p>

        <p style={meta}>
          — {current.book} | {current.author}
        </p>

        {/* 🔥 BOOK COVER PREVIEW */}
        {current.cover && (
          <img
            src={
              current.cover.startsWith("http")
                ? current.cover
                : `/covers/${current.cover}`
            }
            alt={current.book}
            style={image}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/120x180?text=No+Image";
            }}
          />
        )}

        <div style={buttons}>
          <button style={btnPrimary} onClick={nextQuote}>
            🎲 New Quote
          </button>

          <button style={btnSecondary} onClick={handleViewBook}>
            📖 View Book
          </button>
        </div>
      </div>

      {/* MODAL */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {/* LOGIN MODAL */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default Quotes;

// 🎨 STYLES

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  color: "white",
};

const card = {
  background: "#1e293b",
  padding: "40px",
  borderRadius: "20px",
  width: "500px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
};

const quote = {
  fontSize: "20px",
  marginBottom: "20px",
};

const meta = {
  color: "#aaa",
  marginBottom: "15px",
};

const image = {
  width: "120px",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
};

const buttons = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
};

const btnPrimary = {
  background: "#f97316",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

const btnSecondary = {
  background: "#334155",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};