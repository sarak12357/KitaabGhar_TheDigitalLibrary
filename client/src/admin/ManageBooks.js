import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const API = "http://localhost:5000/api/admin";

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API}/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/books/${editingBook._id}`, editingBook);
      alert("Book Updated ✅");
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("Update Error:", err);
      alert("Update failed ❌");
    }
  };

  return (
    <AdminLayout>
      <h2 style={{ marginBottom: "20px" }}>📚 Manage Books</h2>

      {/* 🔥 GRID */}
      <div style={gridStyle}>
        {books.map((book) => (
          <div key={book._id} style={cardStyle}>
            
            {/* ✅ FIXED IMAGE */}
            <img
              src={`http://localhost:3000/covers/${book.cover}`}
              alt={book.title}
              style={imgStyle}
              onError={(e) => {
                e.target.src = "/covers/default.jpg";
              }}
            />

            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p style={{ color: "#555" }}>{book.category}</p>

            <div style={{ marginTop: "10px" }}>
              <button style={editBtn} onClick={() => setEditingBook(book)}>
                Edit
              </button>

              <button style={deleteBtn} onClick={() => deleteBook(book._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 EDIT MODAL */}
      {editingBook && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h2>Edit Book</h2>

            {/* PREVIEW IMAGE */}
            <img
              src={`http://localhost:3000/covers/${editingBook.cover}`}
              alt="preview"
              style={previewImg}
              onError={(e) => {
                e.target.src = "/covers/default.jpg";
              }}
            />

            <input
              style={inputStyle}
              value={editingBook.title}
              placeholder="Title"
              onChange={(e) =>
                setEditingBook({ ...editingBook, title: e.target.value })
              }
            />

            <input
              style={inputStyle}
              value={editingBook.author}
              placeholder="Author"
              onChange={(e) =>
                setEditingBook({ ...editingBook, author: e.target.value })
              }
            />

            <input
              style={inputStyle}
              value={editingBook.category}
              placeholder="Category"
              onChange={(e) =>
                setEditingBook({ ...editingBook, category: e.target.value })
              }
            />

            <input
              style={inputStyle}
              value={editingBook.cover}
              placeholder="Cover Image (e.g. GoneGirl.jpg)"
              onChange={(e) =>
                setEditingBook({ ...editingBook, cover: e.target.value })
              }
            />

            {/* ✅ ADDED SYNOPSIS */}
            <textarea
              style={inputStyle}
              value={editingBook.synopsis}
              placeholder="Synopsis"
              onChange={(e) =>
                setEditingBook({ ...editingBook, synopsis: e.target.value })
              }
            />

            {/* ✅ ADDED CONTENT */}
            <textarea
              style={inputStyle}
              value={editingBook.content}
              placeholder="Full Content"
              onChange={(e) =>
                setEditingBook({ ...editingBook, content: e.target.value })
              }
            />

            <input
              style={inputStyle}
              type="number"
              value={editingBook.synopsisPrice}
              placeholder="Synopsis Price"
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  synopsisPrice: e.target.value,
                })
              }
            />

            <input
              style={inputStyle}
              type="number"
              value={editingBook.fullPrice}
              placeholder="Full Price"
              onChange={(e) =>
                setEditingBook({
                  ...editingBook,
                  fullPrice: e.target.value,
                })
              }
            />

            <label style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                checked={editingBook.isTrending}
                onChange={(e) =>
                  setEditingBook({
                    ...editingBook,
                    isTrending: e.target.checked,
                  })
                }
              />
              <span style={{ marginLeft: "8px" }}>Trending 🔥</span>
            </label>

            {/* BUTTONS */}
            <div style={btnGroup}>
              <button style={saveBtn} onClick={handleUpdate}>
                Save
              </button>

              <button style={cancelBtn} onClick={() => setEditingBook(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default ManageBooks;



/* 🎨 STYLES */

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
};

const cardStyle = {
  width: "250px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
  background: "white",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
};

const imgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "6px",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "5px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "10px",
  width: "400px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const previewImg = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  marginBottom: "10px",
  borderRadius: "6px",
};

const btnGroup = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const saveBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  cursor: "pointer",
};