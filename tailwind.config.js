module.exports = {
  content: ['./views/*.pug', './public/javascripts/*.js'],
  media: false, // or 'media' or 'class'
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
        "168px": "168px",
        "116px": "116px",
        "800px": "800px",
        "268px": "268px",
        "384px": "384px"
      },
      height:{
        "168px": "168px",
        "284px":"284px",
        "121px":"121px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: []
}
