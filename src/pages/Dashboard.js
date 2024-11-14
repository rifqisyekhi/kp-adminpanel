import React from 'react';
import './Dashboard.css'; // Include the path to your CSS
import logo from '../assets/images/Logo_bplj.png'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className='body'>
      <div className="dashboard">
        <img src={logo} alt="Logo" className="logo" />
        <div className="welcome-text">Welcome, Admin!</div>
        <div className="buttons">
          <button className="button" onClick={() => handleNavigation('/input-meeting')}>
            <span>Input Meeting</span>
            <span className="icon">📅</span>
          </button>
          <button className="button" onClick={() => handleNavigation('/schedule')}>
            <span>Schedule</span>
            <span className="icon">📅</span>
          </button>
        </div>
        <button className="sign-out" onClick={handleLogout}>
          Sign Out <span>↪️</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
