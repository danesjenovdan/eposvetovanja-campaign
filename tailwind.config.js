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
        '3/4': '75%',
        '16/9': '56.25%',
      },
      inset: {
        '1/2': '50%',
        '-40': '-10rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
