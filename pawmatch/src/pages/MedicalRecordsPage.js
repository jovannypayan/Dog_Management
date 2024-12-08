import React, { useState, useEffect, useCallback } from 'react';
import { getDogDetails, getDogsWithMedicalHistory, addDog } from '../services/api';  // Import the necessary functions from api.js

const MedicalRecordsPage = () => {
  const [dogId, setDogId] = useState('');
  const [dogs, setDogs] = useState([]); // State to hold the list of dogs and their medical records
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [newProcedure, setNewProcedure] = useState({ procedureDate: '', typeOfProcedure: '' });
  const [newVaccine, setNewVaccine] = useState({ vaccineDate: '', vaccineType: '' });

  // Fetch medical history for the selected dog
  const fetchMedicalHistory = useCallback(async () => {
    try {
      const response = await getDogDetails(dogId);  // Use the function from api.js to fetch medical history for a specific dog
      setMedicalRecords(response);  // Assuming the response is the list of medical records
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  }, [dogId]); // Add dogId as a dependency

  // Fetch all dogs with their medical history
  const fetchAllDogs = async () => {
    try {
      const response = await getDogsWithMedicalHistory(); // Fetch all dogs with medical records
      setDogs(response);  // Set the dogs and their medical history
    } catch (error) {
      console.error('Error fetching dogs with medical history:', error);
    }
  };

  useEffect(() => {
    if (dogId) {
      fetchMedicalHistory(); // Fetch medical history for a specific dog if dogId is provided
    } else {
      fetchAllDogs(); // Fetch all dogs with their medical history if no dogId
    }
  }, [dogId, fetchMedicalHistory]);  // Include fetchMedicalHistory in the dependency array

  // Handle adding a new procedure
  const handleAddProcedure = async () => {
    try {
      await addDog({ dogID: dogId, ...newProcedure });  // Use the function from api.js
      fetchMedicalHistory();  // Refresh data after adding procedure
      setNewProcedure({ procedureDate: '', typeOfProcedure: '' });
    } catch (error) {
      console.error('Error adding medical procedure:', error);
    }
  };

  // Handle adding a new vaccine
  const handleAddVaccine = async () => {
    try {
      await addDog({ dogID: dogId, ...newVaccine });  // Use the function from api.js
      fetchMedicalHistory();  // Refresh data after adding vaccine
      setNewVaccine({ vaccineDate: '', vaccineType: '' });
    } catch (error) {
      console.error('Error adding vaccine:', error);
    }
  };

  return (
    <div>
      <h1>Medical Records</h1>

      {/* Dog ID input to fetch individual dog records */}
      <div>
        <label>Enter Dog ID: </label>
        <input value={dogId} onChange={(e) => setDogId(e.target.value)} />
        <button onClick={fetchMedicalHistory}>Fetch Medical Records</button>
      </div>

      {/* If no dogId is entered, display all dogs and their medical history */}
      <div>
        <h2>Dogs List</h2>
        <ul>
          {dogs.length === 0 ? (
            <li>No dogs found.</li>
          ) : (
            dogs.map((dog, index) => (
              <li key={index}>
                <strong>{dog.name}</strong> - {dog.breed}, {dog.age} years old
                <div>
                  <h3>Medical History</h3>
                  {dog.typeOfProcedure && (
                    <p>
                      <strong>Procedure:</strong> {dog.typeOfProcedure} on {dog.procedureDate}
                    </p>
                  )}
                  {dog.vaccineType && (
                    <p>
                      <strong>Vaccine:</strong> {dog.vaccineType} on {dog.vaccineDate}
                    </p>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Display medical records for the specific dog */}
      <div>
        <h2>Medical History</h2>
        <ul>
          {medicalRecords.length === 0 ? (
            <li>No medical history found for this dog.</li>
          ) : (
            medicalRecords.map((record, index) => (
              <li key={index}>
                {record.vaccineType
                  ? `Vaccine: ${record.vaccineType} on ${record.vaccineDate}`
                  : `Procedure: ${record.typeOfProcedure} on ${record.procedureDate}`}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Add new medical procedure */}
      <div>
        <h2>Add Medical Procedure</h2>
        <input
          type="date"
          value={newProcedure.procedureDate}
          onChange={(e) => setNewProcedure({ ...newProcedure, procedureDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type of Procedure"
          value={newProcedure.typeOfProcedure}
          onChange={(e) => setNewProcedure({ ...newProcedure, typeOfProcedure: e.target.value })}
        />
        <button onClick={handleAddProcedure}>Add Procedure</button>
      </div>

      {/* Add new vaccine */}
      <div>
        <h2>Add Vaccine</h2>
        <input
          type="date"
          value={newVaccine.vaccineDate}
          onChange={(e) => setNewVaccine({ ...newVaccine, vaccineDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vaccine Type"
          value={newVaccine.vaccineType}
          onChange={(e) => setNewVaccine({ ...newVaccine, vaccineType: e.target.value })}
        />
        <button onClick={handleAddVaccine}>Add Vaccine</button>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
