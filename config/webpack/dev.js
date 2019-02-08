const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  mode: 'development',
  watch: true,
  cache: true,
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'my-first-webpack.bundle.js',
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      title: 'Google bouffe',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
    overlay: true,
  },
};
