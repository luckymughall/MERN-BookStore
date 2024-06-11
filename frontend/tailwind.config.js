/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // Ensure this is the correct path to your HTML file(s)
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure these match the structure and file types in your project
    "./public/*.{png,jpg,jpeg,gif,svg}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'my-bg-image': "url('/bg.jpg')", 
        'my-logo-image':"url('/logo.png')",
      },
    },
  },
  plugins: [],
}

