import React, { useState, useEffect, useCallback } from 'react';
import { getDogs, getAdoptionStatus, adoptDog } from '../services/api';  // Import API functions

const AdoptionProcessPage = () => {
  const [dogId, setDogId] = useState('');
  const [dogList, setDogList] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [dogDetails, setDogDetails] = useState(null);
  const [adopterDetails, setAdopterDetails] = useState({
    adopterName: '',
    adopterPhone: '',
    adopterAddress: '',
  });

  // Fetch all dogs from the database on page load
  const fetchDogs = useCallback(async () => {
    try {
      const response = await getDogs();
      setDogList(response.data);
      setFilteredDogs(response.data); // Initially show all dogs
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  }, []);

  // Fetch the dog's adoption status and details
  const fetchAdoptionStatus = async (dogId) => {
    try {
      const response = await getAdoptionStatus(dogId);
      setDogDetails(response.data);  // Set dog details with adoption status
    } catch (error) {
      console.error('Error fetching adoption status:', error);
    }
  };

  // Handle the adoption process
  const handleAdopt = async () => {
    try {
      const adoptionData = {
        dogID: dogId,
        adoptionType: 'Standard Adoption', // You can customize this based on user input
        adopterSSN: '123-45-6789', // Example SSN; replace with actual input or logic
        ...adopterDetails,  // Include adopter details
      };
      await adoptDog(adoptionData);
      fetchAdoptionStatus(dogId); // Refresh dog details after adoption
      alert('Adoption Process Completed!');
    } catch (error) {
      console.error('Error during adoption process:', error);
    }
  };

  // Filter dogs based on the search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = dogList.filter(
      (dog) =>
        dog.name.toLowerCase().includes(query) ||
        dog.breed.toLowerCase().includes(query) ||
        dog.age.toString().includes(query)
    );
    setFilteredDogs(filtered);
  };

  useEffect(() => {
    fetchDogs(); // Fetch the list of dogs on page load
  }, [fetchDogs]);

  return (
    <div>
      <h1>Adoption Process</h1>

      {/* Search Bar */}
      <div>
        <label>Search Dogs: </label>
        <input
          type="text"
          placeholder="Search by name, breed, or age"
          onChange={handleSearch}
        />
      </div>

      {/* List of Dogs */}
      <div>
        <h2>Available Dogs</h2>
        <ul>
          {filteredDogs.map((dog) => (
            <li key={dog.dogID}>
              <button onClick={() => { setDogId(dog.dogID); fetchAdoptionStatus(dog.dogID); }}>
                {dog.name} - {dog.breed} - {dog.age} years old
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display Dog Details and Adoption Info */}
      {dogDetails && (
        <div>
          <h2>Dog Information</h2>
          <p><strong>Name:</strong> {dogDetails.name}</p>
          <p><strong>Breed:</strong> {dogDetails.breed}</p>
          <p><strong>Adoptability Score:</strong> {dogDetails.adoptabilityScore}</p>
          <p><strong>Adopted:</strong> {dogDetails.adoptionType ? 'Yes' : 'No'}</p>

          {dogDetails.adoptionType && (
            <div>
              <h3>Adopter Information</h3>
              <p><strong>Name:</strong> {dogDetails.adopter_name}</p>
              <p><strong>Phone:</strong> {dogDetails.adopter_phone}</p>
              <p><strong>Address:</strong> {dogDetails.adopter_address}</p>
            </div>
          )}
        </div>
      )}

      {/* If dog is not adopted, allow adoption */}
      {!dogDetails?.adoptionType && (
        <div>
          <h2>Adopt This Dog</h2>
          <input
            type="text"
            placeholder="Adopter's Name"
            value={adopterDetails.adopterName}
            onChange={(e) => setAdopterDetails({ ...adopterDetails, adopterName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Adopter's Phone"
            value={adopterDetails.adopterPhone}
            onChange={(e) => setAdopterDetails({ ...adopterDetails, adopterPhone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Adopter's Address"
            value={adopterDetails.adopterAddress}
            onChange={(e) => setAdopterDetails({ ...adopterDetails, adopterAddress: e.target.value })}
          />
          <button onClick={handleAdopt}>Adopt Dog</button>
        </div>
      )}
    </div>
  );
};

export default AdoptionProcessPage;
