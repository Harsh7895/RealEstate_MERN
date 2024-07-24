import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      // Proxy all requests starting with '/api' to the backend server
      "/api": {
        target: "http://localhost:3000", // Replace with your backend server URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
});
