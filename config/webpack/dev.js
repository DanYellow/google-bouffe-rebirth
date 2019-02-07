const path = require('path');

const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
