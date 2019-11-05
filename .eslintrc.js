module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 0,
    'no-unused-expressions':0,
    'no-console': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    'import/named': 0,
    'no-useless-concat': 0,
    'radix': 0,
  },
};
