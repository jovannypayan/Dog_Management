// src/components/DogList.js
import React, { useState, useEffect } from 'react';
import { getDogs, addDog, deleteDog, getDogDetails } from '../services/api'; // Import necessary API functions

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDog, setNewDog] = useState({
    name: '',
    breed: '',
    age: '',
    adoptabilityScore: '',
    arrivalDate: '',
    spayedNeuteredStatus: '',
    sex: '',
    shelterID: '',
  });
  const [selectedDog, setSelectedDog] = useState(null);

  // Fetch the dog list
  useEffect(() => {
    fetchDogList();
  }, []);

  const fetchDogList = async () => {
    try {
      const data = await getDogs();
      setDogs(data);
    } catch (error) {
      console.error('Error fetching dog list:', error);
    }
  };

  // Handle adding a new dog
  const handleAddDog = async () => {
    try {
      await addDog(newDog);
      fetchDogList(); // Refresh the list
      setNewDog({
        name: '',
        breed: '',
        age: '',
        adoptabilityScore: '',
        arrivalDate: '',
        spayedNeuteredStatus: '',
        sex: '',
        shelterID: '',
      });
    } catch (error) {
      console.error('Error adding dog:', error);
    }
  };

  // Handle deleting a dog
  const handleDeleteDog = async (dogID) => {
    try {
      await deleteDog(dogID);
      fetchDogList(); // Refresh the list
    } catch (error) {
      console.error('Error deleting dog:', error);
    }
  };

  // Handle viewing detailed data for a specific dog
  const handleViewDetails = async (dogID) => {
    try {
      const details = await getDogDetails(dogID);
      setSelectedDog(details);
    } catch (error) {
      console.error('Error fetching dog details:', error);
    }
  };

  // Filter dogs based on search term
  const filteredDogs = dogs.filter((dog) =>
    Object.values(dog)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Dog Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, breed, etc."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Dog List */}
      <h2>Dogs</h2>
      <ul>
        {filteredDogs.map((dog) => (
          <li key={dog.dogID}>
            {dog.name} - {dog.breed} - {dog.age} years old
            <button onClick={() => handleViewDetails(dog.dogID)}>View Details</button>
            <button onClick={() => handleDeleteDog(dog.dogID)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Detailed Dog Information */}
      {selectedDog && (
        <div>
          <h3>Details for {selectedDog.name}</h3>
          <p><strong>Breed:</strong> {selectedDog.breed}</p>
          <p><strong>Age:</strong> {selectedDog.age}</p>
          <p><strong>Sex:</strong> {selectedDog.sex}</p>
          <p><strong>Adoptability Score:</strong> {selectedDog.adoptabilityScore}</p>
          <p><strong>Arrival Date:</strong> {selectedDog.arrivalDate}</p>
          <p><strong>Shelter:</strong> {selectedDog.shelterName}</p>
          <p><strong>Spayed/Neutered:</strong> {selectedDog.spayedNeuteredStatus ? 'Yes' : 'No'}</p>
          <button onClick={() => setSelectedDog(null)}>Close</button>
        </div>
      )}

      {/* Add New Dog */}
      <h2>Add New Dog</h2>
      <input
        type="text"
        placeholder="Name"
        value={newDog.name}
        onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Breed"
        value={newDog.breed}
        onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
      />
      <input
        type="number"
        placeholder="Age"
        value={newDog.age}
        onChange={(e) => setNewDog({ ...newDog, age: e.target.value })}
      />
      <input
        type="number"
        placeholder="Adoptability Score"
        value={newDog.adoptabilityScore}
        onChange={(e) => setNewDog({ ...newDog, adoptabilityScore: e.target.value })}
      />
      <input
        type="date"
        value={newDog.arrivalDate}
        onChange={(e) => setNewDog({ ...newDog, arrivalDate: e.target.value })}
      />
      <select
        value={newDog.spayedNeuteredStatus}
        onChange={(e) => setNewDog({ ...newDog, spayedNeuteredStatus: e.target.value })}
      >
        <option value="">Spayed/Neutered</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>
      <select
        value={newDog.sex}
        onChange={(e) => setNewDog({ ...newDog, sex: e.target.value })}
      >
        <option value="">Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="number"
        placeholder="Shelter ID"
        value={newDog.shelterID}
        onChange={(e) => setNewDog({ ...newDog, shelterID: e.target.value })}
      />
      <button onClick={handleAddDog}>Add Dog</button>
    </div>
  );
};

export default DogList;
