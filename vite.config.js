import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/application": {
        target: "https://jcxe983h1e.execute-api.eu-west-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/application/, "/application"),
      },
    },
  },
  plugins: [react()],
});
