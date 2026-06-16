import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // 🔥 VALIDATION FUNCTION
  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (value.length < 3)
        error = "Name must be at least 3 characters";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value))
        error = "Enter valid email (example@gmail.com)";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Minimum 6 characters";
      else if (!/[A-Z]/.test(value))
        error = "Must include a capital letter";
      else if (!/[0-9]/.test(value))
        error = "Must include a number";
    }

    return error;
  };

  // 🔥 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // 🔥 SUBMIT
  const handleRegister = async () => {
    setSuccess("");

    // validate all fields before submit
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend error
        setErrors({ api: data.message });
        return;
      }

      setSuccess("Registered successfully! Redirecting...");

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.error(err);
      setErrors({ api: "Server error" });
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Register ✨</h2>

        {/* NAME */}
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={input}
        />
        {errors.name && <p style={errorText}>{errors.name}</p>}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={input}
        />
        {errors.email && <p style={errorText}>{errors.email}</p>}

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={input}
        />
        {errors.password && <p style={errorText}>{errors.password}</p>}

        {/* BACKEND ERROR */}
        {errors.api && <p style={errorText}>{errors.api}</p>}

        {/* SUCCESS */}
        {success && <p style={successText}>{success}</p>}

        <button onClick={handleRegister} style={btn}>
          Register
        </button>

        <p onClick={() => navigate("/login")} style={link}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;

// 🎨 STYLES
const container = {
  height: "100vh",
  backgroundImage:
    "url(https://images.unsplash.com/photo-1512820790803-83ca734da794)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "320px",
  padding: "25px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
};

const input = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.9)",
  color: "#000",
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  background: "#f97316",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const link = {
  marginTop: "10px",
  color: "#f97316",
  cursor: "pointer",
};

const errorText = {
  color: "#f87171",
  fontSize: "12px",
  marginBottom: "5px",
};

const successText = {
  color: "#4ade80",
  fontSize: "12px",
};