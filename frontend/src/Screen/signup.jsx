import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 handle signup API call
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("Signup successful ✅");
        // Redirect to login
        navigate("/");
      } else {
        alert(data.message || "Signup failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Account 🚀</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label>Full Name</label>
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email Address</label>
          </div>

          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
            <span
              className="toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="field">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label>Confirm Password</label>
          </div>

          <button className="signup-btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-link">
            Already have an account?
            <span onClick={() => navigate("/")}> Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
