const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./base');

const outputDir = '../../public';

module.exports = {
  ...baseConfig,
  mode: 'production',
  watch: false,
  cache: false,
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          mangle: true,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
};
