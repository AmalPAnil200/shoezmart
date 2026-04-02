import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Ensure this matches your install

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:process.env.VITE_BASE_PATH || "/shoezmart/tree/main/client"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
