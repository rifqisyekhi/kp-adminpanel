import React, { useEffect, useState } from 'react';
import './Schedule.css';
import Sidebar from '../components/Sidebar';

function Schedule() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk menghapus meeting
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      try {
        const response = await fetch(`http://localhost:5000/meetings/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          // Hapus dari state jika berhasil dihapus dari backend
          setMeetings(meetings.filter((meeting) => meeting._id !== id));
          alert('Meeting successfully deleted.');
        } else {
          alert('Failed to delete the meeting. Please try again.');
        }
      } catch (err) {
        console.error('Error deleting meeting:', err);
        alert('An error occurred while deleting the meeting.');
      }
    }
  };

  // Fetch data rapat dari API
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:5000/meetings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setMeetings(result);
        } else {
          const error = await response.json();
          setError('Failed to fetch meetings: ' + error.message);
        }
      } catch (err) {
        setError('Failed to fetch meetings: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const filterMeetings = (type) => {
    const today = new Date();
    const offset = 7 * 60 * 60 * 1000; // GMT+7 offset
    const gmt7Today = new Date(today.getTime() + offset);
    gmt7Today.setUTCHours(0, 0, 0, 0);

    if (type === 'today') {
      return meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.tanggal);
        return meetingDate.toISOString().slice(0, 10) === gmt7Today.toISOString().slice(0, 10);
      });
    } else if (type === 'upcoming') {
      return meetings.filter((meeting) => {
        const meetingDate = new Date(meeting.tanggal);
        return meetingDate > gmt7Today;
      });
    }
    return [];
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="sch-all">
      <div className="sch-container">
        {/* Sidebar */}
        <Sidebar activePage="schedule" />

        <main className="sch-main-content">
          <h1>Schedule</h1>
          {meetings.length > 0 ? (
            <section className="sch-meeting-info">
              {/* Rapat Hari Ini */}
              <div className="sch-today">
                <h2>RAPAT HARI INI</h2>
                {filterMeetings('today').map((meeting) => (
                  <div key={meeting._id} className="sch-meeting-card">
                    <p>{meeting.judul}</p>
                    <div className="sch-status">
                      <span className="sch-dot"></span> {meeting.status || 'Sedang Berlangsung'}
                    </div>
                    <div className="sch-details">
                      <p><strong>Waktu:</strong> {meeting.start_time} - {meeting.end_time}</p>
                      <p><strong>Tempat:</strong> {meeting.tempat}</p>
                      <p><strong>Audience:</strong> {meeting.audiens}</p>
                    </div>
                    <button
                      className="sch-delete-btn"
                      onClick={() => handleDelete(meeting._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              {/* Rapat Mendatang */}
              <div className="sch-upcoming">
                <h2>RAPAT MENDATANG</h2>
                {filterMeetings('upcoming').map((meeting) => {
                  const formattedDate = new Intl.DateTimeFormat('id-ID', {
                    timeZone: 'Asia/Bangkok',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(meeting.tanggal));

                  return (
                    <div key={meeting._id} className="sch-meeting-card">
                      <p>{meeting.judul}</p>
                      <div className="sch-details">
                        <p><strong>Tanggal:</strong> {formattedDate}</p>
                        <p><strong>Waktu:</strong> {meeting.start_time} - {meeting.end_time}</p>
                        <p><strong>Tempat:</strong> {meeting.tempat}</p>
                      </div>
                      <button
                        className="sch-delete-btn"
                        onClick={() => handleDelete(meeting._id)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            <p>No meetings scheduled.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Schedule;
