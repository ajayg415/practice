const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  mode: 'development',
  module: {
    rules: [
      // add loaders here if you need (e.g., babel, css)
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
};
