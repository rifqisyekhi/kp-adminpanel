import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InputMeeting from "./pages/InputMeeting";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import InputContent from "./pages/InputContent";
import { isStillAuthorized } from "./libs/user";
import { removeCookie } from "./libs/cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // set to null to handle loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await isStillAuthorized();
        if (isAuth) {
          setIsAuthenticated(true);
        } else {
          removeCookie("authToken");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        removeCookie("authToken");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Jika masih memuat status otentikasi, tampilkan loading
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Routes, hanya jika sudah terotentikasi */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/input-meeting" element={<InputMeeting />} />
            <Route path="/input-content" element={<InputContent />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // Redirect ke login jika tidak terotentikasi
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
