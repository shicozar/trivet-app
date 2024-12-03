import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Compass, BookMarked } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">TravelVision</span>
            </Link>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link to="/saved" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <BookMarked className="h-5 w-5" />
                <span>Saved Places</span>
              </Link>
              <button
                onClick={signOut}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};