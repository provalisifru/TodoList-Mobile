/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#13191F',
        bacakgroundTwo: '#05262F',
        textColor: '#ECE5F0',
        textColorTwo: '#155263',
        textColorThree: '#508484',
      },
    },
  },
  plugins: [],
};
