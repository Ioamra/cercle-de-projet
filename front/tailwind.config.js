/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-one': '#F9F6F1',
        'main-two': '#D9A76F',
        'main-three': '#633E00',
        'main-four': '#606C38',
        'main-five': '#323C00',
      }
    },
  },
  plugins: [],
};
