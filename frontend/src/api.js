import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to make a prediction
export const getPrediction = async (features) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, { features });
    return response.data.prediction;
  } catch (error) {
    console.error("Error making prediction:", error);
    throw error;
  }
};
