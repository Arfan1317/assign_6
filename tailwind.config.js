/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}", // Catches files if they are just sitting in the root folder
    "./components/**/*.{js,ts,jsx,tsx}" // Catches files if you made a separate components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}