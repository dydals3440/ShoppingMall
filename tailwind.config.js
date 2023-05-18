/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#8002F6',
      },
      backgroundImage: {
        banner: `url('../public/images/banner.avif')`,
      },
    },
  },
  plugins: [],
};
