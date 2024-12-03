import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { MapPin } from 'lucide-react';

export const SavedPlaces = () => {
  const { user } = useAuth();
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!user) return;

      try {
        const placesRef = collection(db, 'savedPlaces');
        const q = query(placesRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const places = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setSavedPlaces(places);
      } catch (error) {
        console.error('Error fetching saved places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPlaces();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <MapPin className="mr-2" /> Saved Places
      </h1>
      
      {savedPlaces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-xl">No saved places yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {place.imageUrl && (
                <img
                  src={place.imageUrl}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{place.name}</h2>
                <p className="text-gray-600 mb-2">{place.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {place.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};