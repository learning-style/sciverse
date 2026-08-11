/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Component tests render via @testing-library/react and the physics loop
    // calls requestAnimationFrame, neither of which exist in vitest's default
    // node environment.
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})