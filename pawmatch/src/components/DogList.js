// src/components/DogList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogList = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    axios.get('/api/dogs')
      .then(response => {
        setDogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching dog list:', error);
      });
  }, []);

  return (
    <div>
      <h1>Dog List</h1>
      <ul>
        {dogs.map(dog => (
          <li key={dog.dogID}>
            {dog.name} - {dog.breed} - {dog.age} years old
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogList;
