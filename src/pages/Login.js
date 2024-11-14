import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed with `npm install axios`
import "./Login.css";
import logo from '../assets/images/Logo_bplj.png';
import { useNavigate } from 'react-router-dom'; // For navigation after login

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      if (response.data.token) {
        // Save the token in localStorage or sessionStorage
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login-all'>
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <h2 className="login-h2-sign">Sign in Admin Panel</h2>
          <form id="loginForm" onSubmit={handleSubmit}>
            <label className='login-label' htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password" className='login-label'>Password</label>
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
          <br/>
          <div className="login-options">
            <a href="#" className="login-forgot-password">Forgot Password?</a>
          </div>
          <p className="login-signup-text">I don't have an account? <a href="#">Sign up</a></p>
        </div>
      </div>
    </div>
  );
}
