import React, { useEffect, useState } from "react";
import "./InputMeeting.css";
import Sidebar from "../components/Sidebar";

function InputMeeting() {
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState([]);
  const [audiences, setAudiences] = useState([]); // State untuk daftar audiens

  useEffect(() => {
    // Fetch daftar rooms
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if(response.status === 401 || response.status === 403){
          localStorage.removeItem('token');
          window.location.href = "/login";
        }

        if (response.ok) {
          const result = await response.json();
          setRooms(result);
        } else {
          const error = await response.json();
          console.error("Failed to fetch rooms: " + error.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    // Fetch daftar audiens
    const fetchAudiences = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/audiences`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAudiences(result);
        } else {
          const error = await response.json();
          console.error("Failed to fetch audiences: " + error.message);
        }
      } catch (error) {
        console.error("Error fetching audiences:", error);
      }
    };

    fetchRooms();
    fetchAudiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMeeting = {
      judul: meetingTitle,
      tanggal: date,
      tempat: location,
      audiens: audience,
      start_time: startTime,
      end_time: endTime,
      keterangan: description,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/meetings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newMeeting),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Meeting created successfully");
        window.location.href = "/schedule";
      } else {
        const error = await response.json();
        alert("Failed to create meeting: " + error.message);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("An error occurred while creating the meeting.");
    }
  };

  return (
    <div className="im-all">
      <div className="im-container">
        <Sidebar activePage="input-meeting" />

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
              <option value="" disabled>
                Pilih Tempat
              </option>
              {rooms.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>Audiens</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="" disabled>
                Pilih Audiens
              </option>
              {audiences.map((data, index) => (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              ))}
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
            ></textarea>

            <button type="submit" className="im-submit-button">
              Submit ➔
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default InputMeeting;
