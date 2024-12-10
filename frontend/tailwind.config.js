/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Primary colors
        primary: '#6C9A8B',  // Sage green
        secondary: '#F4E1A1', // Soft beige

        // Text colors
        text: '#2F3E46',        // Charcoal gray for main text
        accentText: '#A9D194', // Leaf green for highlighted/emphasised text

        // Accent colors
        accent: '#A9D194',      // Same leaf green for buttons, hover, etc.
        bloom: '#FFB5A7',       // Floral pink for additional accents
        soil: '#8B5E3C',        // Earthy brown for decorative elements

        // Neutral shades
        background: '#F9F8F5',  // Light garden soil
      },
    },
  },
  plugins: [],
}