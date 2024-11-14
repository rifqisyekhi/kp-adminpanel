import React, { useEffect, useState } from 'react';
import './Schedule.css'; // Include the path to your CSS
import logo from '../assets/images/Logo_bplj.png';
import illustration from '../assets/images/ilustrasi_kalender.png';
import axios from 'axios';

function Schedule() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
  
    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
  
    // Format as dd-mm-yyyy
    return `${day}-${month}-${year}`;
  }

  // Fetch meetings data when component mounts
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // Retrieve the token from localStorage or sessionStorage (based on where you store it)
        const token = localStorage.getItem('token'); // or sessionStorage.getItem('token');
    
        // Make the GET request with Bearer token in the headers
        const response = await axios.get('http://localhost:5000/meetings', {
          headers: {
            'Authorization': `Bearer ${token}`, // Adding Bearer token
          },
        });
    
        setMeetings(response.data);  // Set meetings data
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Failed to fetch meetings');
        setLoading(false);
      }
    };
    

    fetchMeetings();
  }, []); // Empty dependency array to run this only once after the first render

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='sch-all'>
      <div className="sch-container">
        <aside className="sch-sidebar">
          <div className='sch-center'>
            <img src={logo} alt="Logo" className="sch-logo" />
          </div>
          <h2>JADWAL RAPAT</h2>
          <nav className="sch-menu">
            <a href="/dashboard" className="sch-menu-item">
              🏠 Dashboard
            </a>
            <a href="/input-meeting" className="sch-menu-item">
              📅 Input Meeting
            </a>
            <a href="#" className="sch-menu-item active">
              📆 Schedule
            </a>
          </nav>
          <div className="sch-illustration">
            <img src={illustration} alt="Illustration" />
          </div>
        </aside>

        <main className="sch-main-content">
          <h1>Schedule</h1>

          <section className="sch-meeting-info">
  {/* Ensure meetings data is available */}
  {meetings && meetings.length > 0 ? (
    meetings.map((meeting, index) => (
      <div key={index} className="sch-meeting-card">
        <h2>RAPAT {formatDate(meeting.tanggal)}</h2>
        {/* Display meeting title or fallback if not available */}
        <p>{meeting.judul || 'No Title'}</p>
        <div className="sch-status">
          <span className="sch-dot"></span>
          {/* Display status or fallback */}
          {meeting.status || 'Sedang Berlangsung'}
        </div>
        <div className="sch-details">
          {/* Display start_time and end_time, fallback if not available */}
          <p>
            <strong>Waktu:</strong> {meeting.start_time || 'No time available'} - {meeting.end_time || 'No time available'}
          </p>
          {/* Display place (tempat), fallback if not available */}
          <p><strong>Tempat:</strong> {meeting.tempat || 'No location available'}</p>
          {/* Display audience (audiens), fallback if not available */}
          <p><strong>Audience:</strong> {meeting.audiens || 'No audience available'}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No meetings available.</p>
  )}
</section>

        </main>
      </div>
    </div>
  );
}

export default Schedule;
