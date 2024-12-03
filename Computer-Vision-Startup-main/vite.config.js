import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs'; // Import the fs module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: {
  //     key: fs.readFileSync('./localhost-key.pem'),
  //     cert: fs.readFileSync('./localhost-cert.pem'),
  //   },
  //   open: true,  // Automatically open the app in the browser
  // },
});
