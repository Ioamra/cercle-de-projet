/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-one': '#e5af84',
        'main-two': '#d48f89',
        'main-three': '#b1798e',
        'main-four': '#826989',
        'main-five': '#535a76',
        'main-six': '#2f4858'
      }
    },
  },
  plugins: [],
};
