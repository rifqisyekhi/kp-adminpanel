import React, { useEffect, useState } from "react";
import "./InputMeeting.css";
import Sidebar from "../components/Sidebar";
import { getAllRoom } from "../libs/room";
import { getAllAudience } from "../libs/audience";
import { createMeeting } from "../libs/meeting";

function InputMeeting() {
  const [location, setLocation] = useState({ index: "", id: null, name: "" });
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
        const response = await getAllRoom();
        setRooms(response.data || []);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    // Fetch daftar audiens
    const fetchAudiences = async () => {
      try {
        const response = await getAllAudience();

        setAudiences(response.data || []);
      } catch (error) {
        console.error("Error fetching audiences:", error);
      }
    };

    fetchRooms();
    fetchAudiences();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createMeeting(
        meetingTitle,
        date,
        location.name,
        audience,
        startTime,
        endTime,
        description,
        location.id
      );

      console.log(
        meetingTitle,
        date,
        location.name,
        audience,
        startTime,
        endTime,
        description,
        location.id
      );

      if (response.success) {
        alert("Meeting created successfully");
        window.location.href = "/schedule";
      } else {
        alert("Failed to create meeting: " + response.message);
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
              required
            />

            <label htmlFor="date">Tanggal</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label>Tempat</label>
            <select
              value={location.index}
              onChange={(e) => {
                const selectedRoom = rooms[e.target.value];

                setLocation({
                  index: e.target.value,
                  id: selectedRoom?.id || null,
                  name: selectedRoom?.name || "",
                });
              }}
              required
            >
              <option value="" disabled>
                Pilih Tempat
              </option>
              {rooms.map((data, index) => (
                <option key={index} value={index}>
                  {data.name}
                </option>
              ))}
            </select>

            <label>Audiens</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              required
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
                required
              />
              <label>End Time</label>
              <input
                type="time"
                id="end-time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <label htmlFor="description">Keterangan</label>
            <textarea
              id="description"
              placeholder="Tell us about your use case..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

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
