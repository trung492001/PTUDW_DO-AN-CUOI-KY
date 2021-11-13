const pug = require('pug');

module.exports = {
  purge: {
    content: ['./views/*.pug'],
    transform: {
      pug: (content) => pug.render(content)
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
