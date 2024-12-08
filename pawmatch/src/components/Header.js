// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '/Users/jovannypayan/PawMatch/pawmatch/src/styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">PawMatch</div>
      <nav className="header-nav">
        <Link to="/signup" className="nav-link">Sign-in</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/medical-records" className="nav-link">Medical Records</Link>
        <Link to="/adoption-process" className="nav-link">Adoption</Link>
      </nav>
    </header>
  );
};

export default Header;
