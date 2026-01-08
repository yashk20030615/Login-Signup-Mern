import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./temp3.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch(`${API_URL}/api/auth/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h1>Welcome 👋</h1>
        <p>
          Welcome to <b>Login-SignUp Project</b> built using <br />
          <span>React, Node, Express and MongoDB</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
