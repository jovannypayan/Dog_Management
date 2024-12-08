// src/pages/SignInPage.js
import React, { useState } from 'react';
import '../styles/signin.css';  // Import styles specific to the sign-in page


const SignInPage = () => {
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ staffID, password }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage(result.message);
      // Redirect to the dashboard or another page on successful login
      // e.g., window.location.href = '/dashboard';
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Staff ID:</label>
          <input
            type="text"
            value={staffID}
            onChange={(e) => setStaffID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignInPage;
