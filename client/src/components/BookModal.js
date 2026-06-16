import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PopupMessage from "./PopupMessage";

const BookModal = ({ book, onClose }) => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState("");

  if (!book) return null;

  const handleUnlock = async (type) => {
    try {
      if (!user) {
        setPopup("Please login first 🔐");
        return;
      }

      setLoading(true);

      const res = await fetch("http://localhost:5000/api/books/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          type,
        }),
      });

      const data = await res.json();

      console.log("UNLOCK RESPONSE:", data);

      // ❌ ERROR CASE
      if (!res.ok) {
        if (data.message === "Not enough credits") {
          setPopup("❌ Not enough credits\n🎮 Play quiz to earn more");
        } else {
          setPopup(data.message || "Unlock failed");
        }
        return;
      }

      // ✅ SUCCESS
      setPopup("🎉 Unlocked successfully!");

      setUser({
        ...user,
        credits: data.credits,
      });

    } catch (err) {
      console.error(err);
      setPopup("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div style={overlay} onClick={onClose}>
        <div style={modal} onClick={(e) => e.stopPropagation()}>
          <button style={closeBtn} onClick={onClose}>
            ✕
          </button>

          <img
            src={`/covers/${book.cover}`}
            alt={book.title}
            style={image}
          />

          <div style={{ flex: 1 }}>
            <h2>{book.title}</h2>
            <p style={{ color: "#666" }}>{book.author}</p>

            <p style={{ marginTop: "10px" }}>
              {book.synopsis || "No synopsis available"}
            </p>

            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleUnlock("synopsis")}
                disabled={loading}
                style={btnPrimary}
              >
                Unlock Synopsis (5)
              </button>

              <button
                onClick={() => handleUnlock("full")}
                disabled={loading}
                style={btnSecondary}
              >
                Read Full Book (20)
              </button>
            </div>

            <p style={{ marginTop: "10px", color: "#888" }}>
              Credits: {user?.credits}
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 POPUP (THIS WAS THE ISSUE IN YOUR CODE) */}
      {popup && (
        <PopupMessage
          message={popup}
          onClose={() => setPopup("")}
        />
      )}
    </>
  );
};

export default BookModal;





// 🎨 STYLES

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modal = {
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  width: "750px",
  display: "flex",
  gap: "20px",
  position: "relative",
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  border: "none",
  background: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const image = {
  width: "200px",
  height: "300px",
  objectFit: "cover",
  borderRadius: "8px",
};

const btnPrimary = {
  background: "#f97316",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnSecondary = {
  background: "#334155",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};