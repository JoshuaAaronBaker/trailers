/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./server/**/.html',
    './client/**/*.{js,jsx}'],
  theme: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
