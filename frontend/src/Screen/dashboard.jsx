import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    fetch("http://localhost:5000/api/auth/dashboard", {
      headers: { Authorization: token },
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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard-container">
      {/* TOP BAR */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* CENTER CONTENT */}
      <div className="dashboard-content">
        <h1>Welcome 👋</h1>
        <p>
          Welcome to <b>Login-SignUp Project</b> built using <br />
          <span>
            React.JS, Node.JS, Express.JS and MongoDB
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
