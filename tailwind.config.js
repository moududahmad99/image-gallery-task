/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1rem',
          xl: '4rem',
          '2xl': '8rem',
          center: true
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
}

