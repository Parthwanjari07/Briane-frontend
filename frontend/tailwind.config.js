/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#1E1E2A", // Slightly lighter dark for cards
          200: "#1A1A24", // Main dark background
          300: "#141420", // Darker shade for sidebar
          400: "#0F0F18", // Darkest shade
        },
        purple: {
          primary: "#8B5CF6", // Main accent color
          hover: "#7C3AED", // Hover state
          light: "#A78BFA", // Lighter shade
          dark: "#6D28D9", // Darker shade
        },
        charcoal: {
          100: "#2D2D3A", // Lighter charcoal for inputs
          200: "#252532", // Darker charcoal for cards
          300: "#1F1F2C", // Even darker
        },
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.46)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.55)',
      },
    },
  },
  plugins: [],
};