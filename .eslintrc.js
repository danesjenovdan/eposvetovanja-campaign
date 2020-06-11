module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parserOptions: {
    // sourceType: "script",
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-param-reassign': 'off',
  },
};
