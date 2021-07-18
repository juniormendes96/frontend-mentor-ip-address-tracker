const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: theme => ({
        'header-pattern': "url('/images/header-pattern.png')"
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
