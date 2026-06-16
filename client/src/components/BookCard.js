function BookCard({ book, onClick }) {
  if (!book) return null;

  return (
    <div
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer
      transform transition duration-300 ease-in-out
      hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group"
    >
      {/* BOOK IMAGE */}
      <img
        src={
          book.cover
            ? `/covers/${book.cover}`
            : "https://via.placeholder.com/300x420?text=No+Cover"
        }
        alt={book.title}
        className="w-full h-[300px] object-cover rounded-xl"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* TEXT OVER IMAGE */}
      <div className="absolute bottom-0 p-3 text-white opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-md font-semibold">{book.title}</h3>
        <p className="text-xs text-gray-200">{book.author}</p>
      </div>
    </div>
  );
}

export default BookCard;