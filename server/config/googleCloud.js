import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const configureGoogleCloud = () => {
  // Set the Google Cloud credentials path relative to this file
  process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, '../credentials/google-cloud-key.json');
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error('Failed to set Google Cloud credentials path');
  }
};