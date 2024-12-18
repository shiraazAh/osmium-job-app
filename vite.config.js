import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Contributers: Oliver,  */
/* Finally managed to connected the backend database using the help of the LLMs ChapGPT & Claude.Ai */
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
