import React, { useEffect } from "react";
import "./Dashboard.css"; // Include the path to your CSS
import logo from "../assets/images/Logo_bplj.png"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed for authentication
          },
        });

        if(response.status === 401 || response.status === 403){
          localStorage.removeItem('token');
          window.location.href = "/login";
        }

        if (response.status === 401) {
          window.location.href = "/login"; // Redirect to login if unauthorized
        } else if (!response.ok) {
          console.error("Failed to fetch meetings:", response.status);
          throw new Error("Failed to fetch meetings");
        }
      } catch (error) {
        localStorage.removeItem("token");
        console.error("Error fetching meetings:", error);
        window.location.href = "/login"; // Redirect to login in case of error
      }
    };

    fetchMeetings(); // Call the async function
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
