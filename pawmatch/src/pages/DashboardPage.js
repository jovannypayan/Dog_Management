import React, { useState, useEffect } from 'react';
import { fetchDogStats } from '../services/api'; // Import the API function
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalDogs: 0,
    adoptedDogs: 0,
    availableDogs: 0,
    vaccinesDue: 0,
  });
  const [error, setError] = useState(null);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await fetchDogStats(); // Use the fetchDogStats API function
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("Failed to load statistics");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to the PawMatch Dashboard!</h1>

      {error && <p className="error">{error}</p>}

      <div className="stats">
        <h2>Shelter Overview</h2>
        <div className="stat-card">
          <h3>Total Dogs</h3>
          <p>{stats.totalDogs}</p>
        </div>
        <div className="stat-card">
          <h3>Adopted Dogs</h3>
          <p>{stats.adoptedDogs}</p>
        </div>
        <div className="stat-card">
          <h3>Available Dogs</h3>
          <p>{stats.availableDogs}</p>
        </div>
        <div className="stat-card">
          <h3>Vaccines Due</h3>
          <p>{stats.vaccinesDue}</p>
        </div>
      </div>

      <div className="action-section">
        <h2>Staff Actions</h2>
        <div className="actions">
          <div className="action-item">
            <h3>Check Vaccines</h3>
            <p>Review dogs with overdue vaccines.</p>
          </div>
          <div className="action-item">
            <h3>Manage Adoptions</h3>
            <p>Track adoption progress and updates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
