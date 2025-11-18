import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",  // <--- Pastikan ini ada!
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['Montserrat', 'sans-serif'], // Setup font di sini
        },
    },
  },
  plugins: [],
}