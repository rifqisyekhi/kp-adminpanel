import React, { useEffect } from 'react';
import './Dashboard.css'; // Include the path to your CSS
import logo from '../assets/images/Logo_bplj.png'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:5000/meetings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
          },
        });
  
        if (response.status === 401) {
          window.location.href = "/login"; // Redirect to login if unauthorized
        } else if (!response.ok) {
          // Handle other non-OK status codes if necessary
          console.error('Failed to fetch meetings:', response.status);
        } else {
          // Process the response data if successful
          const data = await response.json();
          console.log(data); // Example: process the meetings data
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        window.location.href = "/login"; // Redirect to login in case of error
      }
    };
  
    fetchMeetings(); // Call the async function
  
  }, []); // Empty dependency array, runs only once after the first render
  

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
