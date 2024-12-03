import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginButton } from '../components/LoginButton';
import { ImageUpload } from '../components/ImageUpload';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { analyzeImage } from '../utils/api';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export const Home = () => {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUploaded = async (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImage(imageUrl);
      setRecommendations(result.recommendations);
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveDestination = async (place: any) => {
    try {
      await addDoc(collection(db, 'savedPlaces'), {
        userId: user?.uid,
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        imageUrl: uploadedImage,
        savedAt: new Date().toISOString()
      });
      alert('Destination saved successfully!');
    } catch (err) {
      console.error('Error saving destination:', err);
      alert('Failed to save destination. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-600">
            Sign in to get personalized travel recommendations
          </p>
        </div>
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <ImageIcon className="mr-2" /> Upload Travel Image
            </h2>
            <ImageUpload onImageUploaded={handleImageUploaded} />
            {uploadedImage && (
              <div className="mt-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2" /> Recommendations
            </h2>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="space-y-4">
                {recommendations.map((place, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="text-xl font-semibold">{place.name}</h3>
                    <p className="text-gray-600">{place.formatted_address}</p>
                    {place.rating && (
                      <p className="text-yellow-500">Rating: {place.rating} ⭐</p>
                    )}
                    <button
                      onClick={() => saveDestination(place)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save Destination
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};