// src/services/api.js
import axios from 'axios';

// Define the API base URL
const api = 'http://localhost:3000'; // Adjust this URL based on your backend

export const fetchDogStats = async () => {
  try {
    const response = await axios.get(`${api}/api/dog-stats`);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching dog stats:", error);
    throw error; // Rethrow error to handle it in the component
  }
};

// Fetch all dogs
export const getDogs = async () => {
    try {
      const response = await axios.get(`${api}/api/dogs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dogs:", error);
      throw error;
    }
  };

// Add a new dog
export const addDog = async (dogData) => {
  try {
    const response = await axios.post(`${api}/dogs`, dogData);
    return response.data;
  } catch (error) {
    console.error("Error adding a dog:", error);
    throw error;
  }
};

// Fetch details for a specific dog, including shelter and adopter info
export const getDogDetails = async (dogId) => {
  try {
    const response = await axios.get(`${api}/dog_details/${dogId}`);
    return response.data; // Return the dog details
  } catch (error) {
    console.error(`Error fetching details for dog ID ${dogId}:`, error);
    throw error;
  }
};

// Fetch the list of dogs with their medical history
export const getDogsWithMedicalHistory = async () => {
    try {
      const response = await axios.get(`${api}/api/dogs-with-medical-history`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dogs with medical history:", error);
      throw error;
    }
  };

  export const getAdoptionStatus = async (dogId) => {
    try {
      const response = await axios.get(`${api}/api/adoption-status/${dogId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching adoption status:", error);
      throw error;
    }
  };
  
  // Handle the dog adoption process
  export const adoptDog = async (adoptionData) => {
    try {
      const response = await axios.post(`${api}/api/adopt`, adoptionData);
      return response.data;
    } catch (error) {
      console.error("Error adopting dog:", error);
      throw error;
    }
  };

  