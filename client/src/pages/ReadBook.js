import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH BOOK
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`);
        const data = await res.json();

        console.log("BOOK DATA:", data); // 🔍 DEBUG

        setBook(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // 🔒 SAFE CHECK
  const isUnlocked =
    user?.unlockedBooks?.some(
      (b) =>
        String(b.bookId) === String(id) &&
        String(b.type) === "full"
    ) || false;

  console.log("USER:", user);
  console.log("UNLOCKED BOOKS:", user?.unlockedBooks);
  console.log("IS UNLOCKED:", isUnlocked);

  // ⏳ LOADING
  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  // ❌ NO BOOK
  if (!book || !book._id) {
    return <h2 style={{ padding: "40px" }}>Book not found</h2>;
  }

  // 🔒 ACCESS BLOCK (BUT SHOW INFO)
  if (!isUnlocked) {
    return (
      <div style={container}>
        <h1>{book.title}</h1>
        <p style={{ color: "#777" }}>{book.author}</p>

        <h2 style={{ marginTop: "20px" }}>🔒 Locked</h2>
        <p>You need to unlock this book first.</p>

        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  // ✅ SHOW CONTENT
  return (
    <div style={container}>
      <h1>{book.title}</h1>
      <p style={{ color: "#777" }}>{book.author}</p>

      <div style={content}>
        {book.content || "❌ No content found"}
      </div>
    </div>
  );
};

export default ReadBook;


// 🎨 STYLES

const container = {
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  lineHeight: "1.8"
};

const content = {
  marginTop: "20px",
  fontSize: "18px",
  whiteSpace: "pre-line"
};