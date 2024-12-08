import { getDogDetails } from '../services/api';

const fetchDogInfo = async (dogId) => {
  try {
    const details = await getDogDetails(dogId);
    console.log(details); // Displays the dog details in the console
  } catch (error) {
    console.error("Error fetching dog details:", error);
  }
};

fetchDogInfo(1); // Example call for dog ID 1
