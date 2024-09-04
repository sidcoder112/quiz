/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
   extend: { fontFamily: {
      satoshi: ['Satoshi', 'sans-serif'],
     inter: ['inter', 'sans-serif'],},}
  },
  plugins: [],
}