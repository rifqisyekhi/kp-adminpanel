import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InputMeeting from "./pages/InputMeeting";
import Lobby from "./pages/Lobby";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import InputContent from "./pages/InputContent";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/*" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/input-meeting"
          element={
            <PrivateRoute>
              <InputMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="/input-content"
          element={
            <PrivateRoute>
              <InputContent />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <Schedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/lobby"
          element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
