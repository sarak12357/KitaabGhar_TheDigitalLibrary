import { useEffect, useState } from "react";
import axios from "axios";
import BookShelf from "../components/BookShelf";
import Hero from "../components/Hero";
import BookModal from "../components/BookModal";

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const [trending, setTrending] = useState([]);
  const [romance, setRomance] = useState([]);
  const [classics, setClassics] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [selfGrowth, setSelfGrowth] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔥 FETCH ALL DATA
  // const fetchBooks = async () => {
  //   try {
  //     const allRes = await axios.get("http://localhost:5000/api/books");

  //     const trendingRes = await axios.get(
  //       "http://localhost:5000/api/books/trending",
  //     );
  //     const romanceRes = await axios.get(
  //       "http://localhost:5000/api/books/category/romance",
  //     );
  //     const classicsRes = await axios.get(
  //       "http://localhost:5000/api/books/category/classics",
  //     );
  //     const fantasyRes = await axios.get(
  //       "http://localhost:5000/api/books/category/fantasy",
  //     );

  //     setAllBooks(allRes.data || []);
  //     setFilteredBooks(allRes.data || []);

  //     setTrending(trendingRes.data || []);
  //     setRomance(romanceRes.data || []);
  //     setClassics(classicsRes.data || []);
  //     setFantasy(fantasyRes.data || []);
  //   } catch (err) {
  //     console.error("Error fetching books:", err);
  //   }
  // };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");

      const books = res.data || [];

      setAllBooks(books);
      setFilteredBooks(books);

      // ✅ FILTER LOCALLY (IMPORTANT)
      setTrending(books.filter((b) => b.isTrending));

      setRomance(books.filter((b) => b.category?.toLowerCase() === "romance"));

      setClassics(
        books.filter((b) => b.category?.toLowerCase() === "classics"),
      );

      setSelfGrowth(books.filter((b) => b.category?.toLowerCase() === "self-growth"));

      setFantasy(books.filter((b) => b.category?.toLowerCase() === "fantasy"));
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // 🔥 LIVE SEARCH (REAL-TIME)
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBooks(allBooks);
      return;
    }

    const lower = searchQuery.toLowerCase();

    const filtered = allBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(lower) ||
        book.author.toLowerCase().includes(lower) ||
        book.category.toLowerCase().includes(lower),
    );

    setFilteredBooks(filtered);
  }, [searchQuery, allBooks]);

  return (
    <>
      {/* 🔍 SEARCH */}
      <Hero onSearch={setSearchQuery} />

      {/* 🔥 SEARCH RESULTS */}
      <div style={mainContainer}>
        {searchQuery ? (
          <>
            {filteredBooks.length > 0 ? (
              <BookShelf
                title="Search Results 🔍"
                books={filteredBooks}
                onBookClick={setSelectedBook}
              />
            ) : (
              <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                No books found 😢
              </h2>
            )}
          </>
        ) : (
          <>
            {/* 📚 DEFAULT SECTIONS */}
            <BookShelf
              title="Trending Books"
              books={trending}
              onBookClick={setSelectedBook}
            />

            <BookShelf
              title="Romance"
              books={romance}
              onBookClick={setSelectedBook}
            />

            <BookShelf
              title="Classics"
              books={classics}
              onBookClick={setSelectedBook}
            />

            <BookShelf
              title="Fantasy"
              books={fantasy}
              onBookClick={setSelectedBook}
            />

            <BookShelf
              title="Self Growth"
              books={selfGrowth}
              onBookClick={setSelectedBook}
            />
          </>
        )}
      </div>

      {/* 📖 MODAL */}
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </>
  );
}

export default Home;

const mainContainer = {
  padding: "30px 80px", // 🔥 LEFT-RIGHT SPACE FIX
};

const noResult = {
  textAlign: "center",
  marginTop: "50px",
  color: "#64748b",
};
