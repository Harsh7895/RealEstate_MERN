import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://harsh-estate-mern-api.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrites: [{ source: "/(.*)", destination: "/" }],
      },
    },
  },
  plugins: [react()],
});
