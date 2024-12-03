import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LogIn } from 'lucide-react';

export const LoginButton = () => {
  const { signInWithGoogle, error } = useAuth();

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
    >
      <LogIn className="h-5 w-5" />
      <span>Sign in with Google</span>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </button>
  );
};