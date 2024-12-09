import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass token for authentication
          },
        });

        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem("token"); // Remove token from localStorage
          setIsAuthenticated(false);
        } else if (!response.ok) {
          // General error in API call
          console.error("Failed to fetch data:", response.status);
          setIsAuthenticated(false);
        } else {
          // If response is OK, user is authenticated
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  // Wait for the authentication check to complete before rendering
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Loading state while checking auth
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
