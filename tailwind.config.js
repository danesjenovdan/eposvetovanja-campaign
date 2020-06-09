module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#ea5658',
        secondary: '#258498',
      },
      spacing: {
        square: '100%',
        '1/2': '50%',
        '16/9': '56.25%',
      },
    },
  },
  variants: {},
  plugins: [],
};
