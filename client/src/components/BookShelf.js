import { useRef } from "react";
import BookCard from "./BookCard";

function BookShelf({ title, books, onBookClick }) {
  const scrollRef = useRef(null);

  if (!books || !Array.isArray(books)) return null;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="mb-12 relative">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-2">{title}</h2>

      {/* LEFT BUTTON */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
        w-10 h-10 rounded-full bg-orange-500 text-white
        flex items-center justify-center shadow-md
        hover:bg-orange-600 transition"
      >
        ❮
      </button>

      {/* BOOK ROW */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-10 scroll-smooth scrollbar-hide"
      >
        {books.length === 0 ? (
          <p className="text-gray-400">No books found</p>
        ) : (
          books.map((book) => (
            <div key={book._id} className="min-w-[220px]">
              <BookCard book={book} onClick={() => onBookClick(book)} />
            </div>
          ))
        )}
      </div>

      {/* RIGHT BUTTON */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2
        w-10 h-10 rounded-full bg-orange-500 text-white
        flex items-center justify-center shadow-md
        hover:bg-orange-600 transition"
      >
        ❯
      </button>
    </div>
  );
}

export default BookShelf;
