const path = require('path');

const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};
