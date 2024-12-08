// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { fetchDogStats } from '../services/api'; // Import the API function
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [dogStats, setDogStats] = useState({
    totalDogs: 0,
    adoptedDogs: 0,
    availableDogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    const getStats = async () => {
      try {
        const stats = await fetchDogStats(); // Call the API function
        setDogStats(stats); // Set the state with the data received
      } catch (err) {
        setError('Failed to load dog stats.'); // Handle error if API call fails
      } finally {
        setLoading(false); // Stop loading once the data is fetched or failed
      }
    };

    getStats();
  }, []); // Empty array to call once on component mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if API call fails
  }

  return (
    <div className="dashboard">
      <h1>Welcome to the PawMatch Dashboard!</h1>
      
      <div className="stats">
        <h2>Dog Shelter Stats</h2>
        <div className="stat-card">
          <h3>Total Dogs</h3>
          <p>{dogStats.totalDogs}</p>
        </div>
        <div className="stat-card">
          <h3>Adopted Dogs</h3>
          <p>{dogStats.adoptedDogs}</p>
        </div>
        <div className="stat-card">
          <h3>Available Dogs</h3>
          <p>{dogStats.availableDogs}</p>
        </div>
      </div>
      
      <div className="action-section">
        <h2>Recent Activity</h2>
        <div className="actions">
          <div className="action-item">
            <h3>Upcoming Medical Procedures</h3>
            <p>Check upcoming medical procedures for dogs.</p>
          </div>
          <div className="action-item">
            <h3>Pending Adoption Requests</h3>
            <p>View and approve recent adoption requests.</p>
          </div>
        </div>
      </div>
      
      <div className="staff-section">
        <h2>Staff Management</h2>
        <p>Manage staff and check who is assigned to the shelter.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
