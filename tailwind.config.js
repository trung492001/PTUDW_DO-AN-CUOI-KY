module.exports = {
  purge: ['./views/*.pug'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: '#06c1d4'
      },
      spacing: {
        "22": "5.5rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
