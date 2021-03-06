const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'main.js',
  },
  mode: 'production',
};