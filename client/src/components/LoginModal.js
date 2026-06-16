import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PopupMessage from "./PopupMessage";

function LoginModal({ onClose }) {
  const { setUser } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [successPopup, setSuccessPopup] = useState(null);

  // ✅ VALIDATION
  const validateForm = () => {
    if (!isLogin) {
      if (!name.trim()) return "Name is required";
      if (name.trim().length < 3)
        return "Name must be at least 3 characters";
    }

    if (!email) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email))
      return "Enter valid email (example@gmail.com)";

    if (!password) return "Password is required";

    if (password.length < 6)
      return "Password must be at least 6 characters";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordRegex.test(password))
      return "Password must include letters & numbers";

    return null;
  };

  // ✅ SUBMIT
  const handleSubmit = async () => {
    try {
      setError("");

      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      const url = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ❌ SHOW INLINE ERROR (NO POPUP)
      if (!res.ok) {
        setError(data.message);
        return;
      }

      // ✅ LOGIN SUCCESS
      if (isLogin) {
        setUser(data.user);
        localStorage.setItem("token", data.token);

        setSuccessPopup("Login successful 🎉");

        setTimeout(() => {
          onClose();
        }, 1500);
      }

      // ✅ REGISTER SUCCESS
      else {
        setSuccessPopup("Registered successfully! Please login 🔐");

        setTimeout(() => {
          setIsLogin(true);
        }, 1500);
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <>
      <div style={overlay}>
        <div style={modal}>
          <h2>{isLogin ? "Login 🔐" : "Register ✨"}</h2>

          {!isLogin && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              style={input}
            />
          )}

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            style={input}
          />

          {/* ✅ INLINE ERROR */}
          {error && <p style={errorText}>{error}</p>}

          <button onClick={handleSubmit} style={btn}>
            {isLogin ? "Login" : "Register"}
          </button>

          <p style={switchText}>
            {isLogin ? "New user?" : "Already have an account?"}
            <span
              style={link}
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? " Register" : " Login"}
            </span>
          </p>

          <button onClick={onClose} style={closeBtn}>
            Cancel
          </button>
        </div>
      </div>

      {/* ✅ SUCCESS ONLY POPUP */}
      {successPopup && <PopupMessage message={successPopup} />}
    </>
  );
}

export default LoginModal;

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
  background: "#1e293b",
  padding: "30px",
  borderRadius: "16px",
  width: "320px",
  color: "white",
  textAlign: "center",
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "none",
  color: "black",
};

const btn = {
  background: "#f97316",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "8px",
  width: "100%",
};

const closeBtn = {
  marginTop: "10px",
  background: "transparent",
  color: "#aaa",
  border: "none",
};

const switchText = {
  marginTop: "10px",
  fontSize: "14px",
};

const link = {
  color: "#f97316",
  cursor: "pointer",
};

const errorText = {
  color: "#f87171",
  fontSize: "13px",
};