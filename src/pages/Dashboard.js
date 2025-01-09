import React from "react";
import "./Dashboard.css"; // Include the path to your CSS
import logo from "../assets/images/Logo_bplj.png"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { logout } from "../libs/user";

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const response = logout();
    if (response) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="db-body">
      <div className="db-dashboard">
        <img src={logo} alt="Logo" className="db-logo" />
        <div className="db-welcome-text">Welcome, Admin!</div>
        <div className="db-buttons">
          <button
            className="db-button"
            onClick={() => handleNavigation("/input-meeting")}
          >
            <span>Input Meeting</span>
            <span className="db-icon">📅</span>
          </button>
          <button
            className="db-button"
            onClick={() => handleNavigation("/schedule")}
          >
            <span>Schedule</span>
            <span className="db-icon">📅</span>
          </button>
          <button
            className="db-button"
            onClick={() => handleNavigation("/input-content")}
          >
            <span>Input Konten</span>
            <span className="db-icon">📝</span>
          </button>
        </div>
        <button className="db-sign-out" onClick={handleLogout}>
          Sign Out <span>↪️</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
