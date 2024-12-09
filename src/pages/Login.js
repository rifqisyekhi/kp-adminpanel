import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../assets/images/Logo_bplj.png";
import { useNavigate } from "react-router-dom";
import illustration1 from "../assets/images/Ilustrasi.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if needed for authentication
        },
      });

      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    };

    check();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure username and password are not empty
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password,
        }
      );

      if (response?.data?.token) {
        // Save the token securely (sessionStorage or localStorage)
        localStorage.setItem("token", response.data.token);
        // Redirect to the dashboard
        if (navigate) {
          navigate("/dashboard");
        } else {
          window.location.href = "/dashboard"; // Fallback navigation
        }
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password");
      } else if (err.response) {
        setError(
          `Error: ${err.response.data.message || "Something went wrong"}`
        );
      } else {
        setError("Network error. Please try again later.");
      }
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-all">
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-h2-sign">Sign in Admin Panel</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-button-sign-in">
              Sign In
            </button>
          </form>
          <br />
        </div>
        <div className="login-illustration">
          <img src={illustration1} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}
