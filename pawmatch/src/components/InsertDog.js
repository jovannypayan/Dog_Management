import React, { useState } from 'react';
import { addDog } from '../services/api';

const InsertDog = () => {
  const [dogData, setDogData] = useState({
    staffID: '',
    name: '',
    breed: '',
    age: '',
    adoptabilityScore: '',
    arrivalDate: '',
    spayedNeuteredStatus: '',
    sex: '',
    initialStatus: '',
    kennelNo: '',
    dateStartAvailability: '',
    mainImageUrl: '',
    extraImageUrls: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDog(dogData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error inserting dog:', error);
      });
  };

  return (
    <div>
      <h1>Insert New Dog</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <input type="text" name="staffID" placeholder="Staff ID" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="breed" placeholder="Breed" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="number" name="adoptabilityScore" placeholder="Adoptability Score" onChange={handleChange} />
        <input type="date" name="arrivalDate" onChange={handleChange} required />
        <select name="spayedNeuteredStatus" onChange={handleChange} required>
          <option value="">Spayed/Neutered Status</option>
          <option value="Spayed">Spayed</option>
          <option value="Neutered">Neutered</option>
          <option value="Not Spayed/Neutered">Not Spayed/Neutered</option>
        </select>
        <select name="sex" onChange={handleChange} required>
          <option value="">Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="initialStatus" onChange={handleChange} required>
          <option value="">Initial Status</option>
          <option value="Available">Available</option>
          <option value="Adopted">Adopted</option>
        </select>
        <input type="text" name="kennelNo" placeholder="Kennel Number" onChange={handleChange} />
        <input type="date" name="dateStartAvailability" placeholder="Availability Start Date" onChange={handleChange} />
        <input type="url" name="mainImageUrl" placeholder="Main Image URL" onChange={handleChange} />
        <input type="text" name="extraImageUrls" placeholder="Extra Image URLs (comma separated)" onChange={handleChange} />
        <button type="submit">Insert Dog</button>
      </form>
    </div>
  );
};

export default InsertDog;
