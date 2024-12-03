import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const analyzeImage = async (imageUrl: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/analyze`, {
      imageUrl
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to analyze image');
  }
};