/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cedarville: ['"Cedarville Cursive"', 'cursive'],
      },
      screens: {
        'max-1500': { max: '1500px' },
        'max-1450': { max: '1450px' },
        'max-1350': { max: '1350px' },
        'max-1300': { max: '1300px' },
        'max-1250': { max: '1250px' },
        'max-1200': { max: '1200px' },
        'max-1050': { max: '1050px' },
        'max-800': { max: '800px' },
        'max-650': { max: '650px' },
        'max-550': { max: '550px' },
        'max-450': { max: '450px' },
        'min-850': { min: '850px' },
        'min-1200': { min: '1200px' },
        'min-1240': { min: '1240px' },
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'html, *, ::after, ::before': {
          scrollBehavior: 'smooth',
          padding: '0',
          margin: '0',
          boxSizing: 'border-box',
        },
      });
    },
  ],
};
