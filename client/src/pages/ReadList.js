import { useEffect, useState } from "react";

function Readlist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchReadlist();
  }, []);

  const fetchReadlist = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/books/readlist", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setBooks(data);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Readlist ❤️</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {books.map((book) => (
          <div key={book._id}>
            <img
              src={`/covers/${book.cover}`}
              alt={book.title}
              width="150"
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Readlist;