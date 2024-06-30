import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {viteRequire} from "vite-require";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(),viteRequire()],
  preview: {
   port: 80,
   strictPort: true,
  },
  server: {
   port: 80,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:80",
  },
 });