// src/pages/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomePage.css'; // Optional CSS file for styling

const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <h1>Welcome to PawMatch</h1>
      <p>Your ultimate dog management and adoption system.</p>
      <div className="welcome-buttons">
        <Link to="/signup" className="btn">Sign In</Link>
        <Link to="/dashboard" className="btn">Go to Dashboard</Link>
        <Link to="/adoption-process" className="btn">Adopt a Dog</Link>
      </div>
    </div>
  );
};

export default WelcomePage;
