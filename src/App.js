import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InputMeeting from './pages/InputMeeting';
import Lobby from './pages/Lobby';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import InputContent from './pages/InputContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/input-meeting" element={<InputMeeting />} />
        <Route path="/input-content" element={<InputContent />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </Router>
  );
}

export default App;
