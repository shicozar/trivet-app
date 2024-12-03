import { OAuthProvider } from 'firebase/auth';

export const getPinterestProvider = () => {
  const provider = new OAuthProvider('pinterest.com');
  
  // Add required scopes for Pinterest API
  provider.addScope('read_public');
  provider.addScope('read_private');
  provider.addScope('boards:read');
  provider.addScope('boards:write');
  
  // Set custom parameters
  provider.setCustomParameters({
    'prompt': 'consent',
    'client_id': import.meta.env.VITE_PINTEREST_APP_ID
  });
  
  return provider;
};