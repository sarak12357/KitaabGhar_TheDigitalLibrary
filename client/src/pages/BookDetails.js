import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function BookDetails() {

  const { id } = useParams();
  const { user, fetchUser } = useContext(UserContext);

  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books/${id}`
      );
      setBook(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlock = async (type) => {
    try {
      console.log("Sending:", {
        userId: user._id,
        bookId: book._id,
        type,
      });

      await axios.post("http://localhost:5000/api/books/unlock", {
        userId: user._id,
        bookId: book._id,
        type,
      });

      fetchUser(); // 🔥 refresh credits

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unlock failed");
    }
  };

  if (!book || !user) {
    return <div className="p-10">Loading...</div>;
  }

  const isSynopsisUnlocked = user.unlockedBooks?.some(
    (b) => b.bookId === book._id && b.type === "synopsis"
  );

  const isFullUnlocked = user.unlockedBooks?.some(
    (b) => b.bookId === book._id && b.type === "full"
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={`/covers/${book.cover}`}
          alt={book.title}
          className="w-full max-w-sm rounded-lg shadow"
        />

        <div>

          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-500 mb-4">{book.author}</p>
          <p className="mb-6">{book.synopsis}</p>

          <div className="flex gap-4">

            {isSynopsisUnlocked ? (
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg">
                ✓ Unlocked
              </button>
            ) : (
              <button
                onClick={() => handleUnlock("synopsis")}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg"
              >
                Unlock Synopsis ₹{book.synopsisPrice}
              </button>
            )}

            {isFullUnlocked ? (
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                📖 Read Now
              </button>
            ) : (
              <button
                onClick={() => handleUnlock("full")}
                className="border border-orange-500 px-6 py-2 rounded-lg"
              >
                Unlock Full Book ₹{book.fullPrice}
              </button>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;