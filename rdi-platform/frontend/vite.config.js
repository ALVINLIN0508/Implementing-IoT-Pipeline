import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the React frontend application
export default defineConfig({
  // Load the React plugin to enable JSX transformation and HMR (Hot Module Replacement)
  plugins: [react()],

  // Development server configuration
  server: {
    // Set the development server to run on port 3000
    port: 3000,
    // Allow access from any host (useful for Docker and remote access)
    host: true,
  },
});
