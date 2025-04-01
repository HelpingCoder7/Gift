import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "c691096a-43d5-484f-b3b2-25feec04bcc8-00-2csahguoa67rg.spock.replit.dev",
    ],
  },
});
