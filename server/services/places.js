import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export const getPlaceRecommendations = async (searchContext) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query: `${searchContext} tourist attractions`,
          key: PLACES_API_KEY,
          type: 'tourist_attraction'
        }
      }
    );
    
    return response.data.results.map(place => ({
      name: place.name,
      formatted_address: place.formatted_address,
      rating: place.rating,
      place_id: place.place_id,
      photos: place.photos,
      types: place.types
    }));
  } catch (error) {
    console.error('Places API Error:', error);
    throw new Error('Failed to fetch place recommendations');
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: PLACES_API_KEY,
          fields: 'name,formatted_address,photos,rating,reviews,website,formatted_phone_number,opening_hours'
        }
      }
    );
    
    return response.data.result;
  } catch (error) {
    console.error('Places Details API Error:', error);
    throw new Error('Failed to fetch place details');
  }
};