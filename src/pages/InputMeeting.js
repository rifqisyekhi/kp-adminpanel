import React, { useEffect, useState } from 'react';
import './InputMeeting.css'; // Include the path to your CSS
import logo from '../assets/images/Logo_bplj.png';
import illustration from '../assets/images/ilustrasi_kalender.png';

function InputMeeting() {
  const [location, setLocation] = useState('');
  const [audience, setAudience] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/rooms', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
          }
        });

        if (response.ok) {
          const result = await response.json();
          setRooms(result);
        } else {
          const error = await response.json();
          console.log('Failed to fetch rooms: ' + error.message);
        }
      } catch (error) {
        console.error('Error creating meeting:', error);
        console.log('An error occurred while fetch the room.');
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMeeting = {
      judul : meetingTitle,
      tanggal : date,
      tempat : location,
      audiens : audience,
      start_time : startTime,
      end_time : endTime,
      keterangan : description
    };

    try {
      const response = await fetch('http://localhost:5000/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
        },
        body: JSON.stringify(newMeeting)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Meeting created successfully');
        window.location.href = "/schedule";
        // Redirect to a different page or reset the form if needed
      } else {
        const error = await response.json();
        alert('Failed to create meeting: ' + error.message);
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
      alert('An error occurred while creating the meeting.');
    }
  };

  return (
    <div className='im-all'>
      <div className="im-container">
        <aside className="im-sidebar">
          <div className='im-center'>
            <img src={logo} alt="Logo" className="im-logo" />
          </div>
          <h2>JADWAL RAPAT</h2>
          <nav className="im-menu">
            <a href="/dashboard" className="im-menu-item">🏠 Dashboard</a>
            <a href="/input-meeting" className="im-menu-item active">📅 Input Meeting</a>
            <a href="/schedule" className="im-menu-item">📆 Schedule</a>
          </nav>
          <div className="im-illustration">
            <img src={illustration} alt="Illustration" />
          </div>
        </aside>

        <main className="im-main-content">
          <h1>Input Meeting</h1>
          <form className="im-meeting-form" onSubmit={handleSubmit}>
            <label htmlFor="meeting-title">Judul Rapat</label>
            <input
              type="text"
              id="meeting-title"
              placeholder="Rapat Kabinet"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />

            <label htmlFor="date">Tanggal</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label>Tempat</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>Pilih Tempat</option>
              {
                rooms.map((data, index) => {
                  return <option key={index} value={data.name}>{data.name}</option> 
                })
              }
            </select>

            <label>Audiens</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="" disabled>Pilih Audiens</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Internal Staff">Internal Staff</option>
              <option value="VIP">VIP</option>
            </select>

            <div className="im-time-group">
              <label>Start Time</label>
              <input
                type="time"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <label>End Time</label>
              <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <label htmlFor="description">Keterangan</label>
            <textarea
              id="description"
              placeholder="Tell us about your use case..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="im-submit-button">Submit ➔</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default InputMeeting;
