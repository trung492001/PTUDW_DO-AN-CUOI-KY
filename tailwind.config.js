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
      },
      width: {
        "997px": "997px",
        "997xl": "calc(100% - 247px)",
        "168px": "168px"
      },
      height:{
        "168px": "168px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
