import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';

import path from 'path'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "src/config"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "src/services"),
      }
    ],
  },
  test: {
    environment: 'jsdom',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://gateway.marvel.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove "/api" do caminho
      },
    },
  },

})
