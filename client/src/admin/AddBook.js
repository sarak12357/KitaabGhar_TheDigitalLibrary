import { useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

function AddBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    customCategory: "",
    cover: "",
    synopsis: "",
    content: "",
    synopsisPrice: 5,
    fullPrice: 20,
    isTrending: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const finalCategory =
        form.customCategory.trim() !== ""
          ? form.customCategory
          : form.category;

      await axios.post("http://localhost:5000/api/admin/books", {
        ...form,
        category: finalCategory,
      });

      alert("✅ Book added successfully!");

      setForm({
        title: "",
        author: "",
        category: "",
        customCategory: "",
        cover: "",
        synopsis: "",
        content: "",
        synopsisPrice: 5,
        fullPrice: 20,
        isTrending: false,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding book");
    }
  };

  return (
    <AdminLayout>
      <div style={container}>
        <h2 style={title}>📚 Add New Book</h2>

        <div style={card}>
          {/* LEFT COLUMN */}
          <div style={column}>
            <input
              name="title"
              placeholder="Book Title"
              value={form.title}
              onChange={handleChange}
              style={input}
            />

            <input
              name="author"
              placeholder="Author"
              value={form.author}
              onChange={handleChange}
              style={input}
            />

            {/* GENRE */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={input}
            >
              <option value="">Select Genre</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="fantasy">Fantasy</option>
              <option value="classics">Classics</option>
            </select>

            <input
              name="cover"
              placeholder="Cover Image (e.g. GoneGirl.jpg)"
              value={form.cover}
              onChange={handleChange}
              style={input}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div style={column}>
            <textarea
              name="synopsis"
              placeholder="Synopsis"
              value={form.synopsis}
              onChange={handleChange}
              style={textarea}
            />

            <textarea
              name="content"
              placeholder="Full Content"
              value={form.content}
              onChange={handleChange}
              style={textarea}
            />

            <div style={priceRow}>
              <input
                name="synopsisPrice"
                type="number"
                value={form.synopsisPrice}
                onChange={handleChange}
                style={priceInput}
              />

              <input
                name="fullPrice"
                type="number"
                value={form.fullPrice}
                onChange={handleChange}
                style={priceInput}
              />
            </div>

            <label style={checkbox}>
              <input
                type="checkbox"
                name="isTrending"
                checked={form.isTrending}
                onChange={handleChange}
              />
              Mark as Trending 🔥
            </label>

            <button onClick={handleSubmit} style={button}>
              ➕ Add Book
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddBook;



/* 🎨 STYLES */

const container = {
  padding: "30px",
};

const title = {
  marginBottom: "20px",
};

const card = {
  display: "flex",
  gap: "30px",
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const column = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const textarea = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  minHeight: "100px",
  fontSize: "14px",
};

const priceRow = {
  display: "flex",
  gap: "10px",
};

const priceInput = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const checkbox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const button = {
  marginTop: "10px",
  padding: "12px",
  background: "#ff7a00",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
};