import React, { useEffect, useState } from "react";
import "./Schedule.css";
import Sidebar from "../components/Sidebar";
import { deleteMeetingById, getAllMeeting } from "../libs/meeting";

function Schedule() {
  const [meetings, setMeetings] = useState([]);
  const [todayMeetings, setTodayMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  const fetchMeetings = async () => {
    try {
      const response = await getAllMeeting();

      if (response.success) {
        const result = response.data;
        setMeetings(result);

        const today = new Date();
        const offset = 7 * 60 * 60 * 1000; // GMT+7 offset
        const gmt7Today = new Date(today.getTime() + offset);
        gmt7Today.setUTCHours(0, 0, 0, 0);

        const todayFiltered = result.filter((meeting) => {
          const meetingDate = new Date(meeting.tanggal);
          return (
            meetingDate.toISOString().slice(0, 10) ===
            gmt7Today.toISOString().slice(0, 10)
          );
        });

        const upcomingFiltered = result.filter((meeting) => {
          const meetingDate = new Date(meeting.tanggal);
          return meetingDate > gmt7Today;
        });

        setTodayMeetings(todayFiltered);
        setUpcomingMeetings(upcomingFiltered);
      }
    } catch (err) {
      alert("Failed to fetch meetings: " + err.message);
    }
  };

  // Fetch data rapat dari API
  useEffect(() => {
    fetchMeetings();
  }, []);

  // Fungsi untuk menghapus meeting
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        const response = await deleteMeetingById(id);

        if (response.success) {
          setMeetings(meetings.filter((meeting) => meeting.id !== id));
          alert("Meeting successfully deleted.");
          fetchMeetings();
        } else {
          alert("Failed to delete the meeting. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting meeting:", err);
        alert("An error occurred while deleting the meeting.");
      }
    }
  };

  return (
    <div className="sch-all">
      <div className="sch-container">
        {/* Sidebar */}
        <Sidebar activePage="schedule" />

        <main className="sch-main-content">
          <h1>Schedule</h1>
          {meetings.length > 0 || upcomingMeetings.length > 0 ? (
            <section className="sch-meeting-info">
              {/* Rapat Hari Ini */}
              {todayMeetings.length > 0 && (
                <div className="sch-today">
                  <h2>RAPAT HARI INI</h2>
                  {todayMeetings.map((meeting) => (
                    <div key={meeting.id} className="sch-meeting-card">
                      <p>{meeting.judul}</p>
                      <div className="sch-status">
                        <span className="sch-dot"></span>{" "}
                        {meeting.status || "Sedang Berlangsung"}
                      </div>
                      <div className="sch-details">
                        <p>
                          <strong>Waktu:</strong> {meeting.start_time} -{" "}
                          {meeting.end_time}
                        </p>
                        <p>
                          <strong>Tempat:</strong> {meeting.tempat}
                        </p>
                        <p>
                          <strong>Audience:</strong> {meeting.audiens}
                        </p>
                      </div>
                      <button
                        className="sch-delete-btn"
                        onClick={() => handleDelete(meeting.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Rapat Mendatang */}
              {upcomingMeetings.length > 0 && (
                <div className="sch-upcoming">
                  <h2>RAPAT MENDATANG</h2>
                  {upcomingMeetings.map((meeting) => {
                    const formattedDate = new Intl.DateTimeFormat("id-ID", {
                      timeZone: "Asia/Bangkok",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(meeting.tanggal));

                    return (
                      <div key={meeting.id} className="sch-meeting-card">
                        <p>{meeting.judul}</p>
                        <div className="sch-details">
                          <p>
                            <strong>Tanggal:</strong> {formattedDate}
                          </p>
                          <p>
                            <strong>Waktu:</strong> {meeting.start_time} -{" "}
                            {meeting.end_time}
                          </p>
                          <p>
                            <strong>Tempat:</strong> {meeting.tempat}
                          </p>
                        </div>
                        <button
                          className="sch-delete-btn"
                          onClick={() => handleDelete(meeting.id)}
                        >
                          Delete
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
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
