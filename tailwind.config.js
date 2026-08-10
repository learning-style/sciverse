/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can define custom brand colors here later
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Manual toggling enabled, but we will style for dark by default
}