import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/employees": "http://localhost:8080",
    },
  },
});

