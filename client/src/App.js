import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Readlist from "./pages/ReadList";
import ReadBook from "./pages/ReadBook";
import Quiz from "./pages/Quiz";
import QuizCategory from "./pages/QuizCategory";
import WhatsHot from "./pages/What'sHot";
import Quotes from "./pages/Quotes";
import AdminDashboard from "./admin/AdminDashboard";
import AddBook from "./admin/AddBook";
import ManageBooks from "./admin/ManageBooks";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Detect admin routes
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div style={{ background: "#f8f9fb", minHeight: "100vh" }}>
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/readlist" element={<Readlist />} />
        <Route path="/read/:id" element={<ReadBook />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/explore" element={<WhatsHot />} />
        <Route path="/quiz" element={<QuizCategory />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddBook />} />
        <Route path="/admin/manage" element={<ManageBooks />} />
      </Routes>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
