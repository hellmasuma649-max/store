/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#20251f',
        paper: '#2843b1',
        leaf: '#7abdf1',
        citrus: '#205d8f',
        coral: 'rgb(58, 107, 132)',

      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}