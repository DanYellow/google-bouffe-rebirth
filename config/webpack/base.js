const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Styled: ['react-emotion', 'default'],
      injectGlobal: ['react-emotion', 'injectGlobal'],
      css: ['react-emotion', 'css'],
      React: 'react',
      PropType: ['prop-types'],
      Component: ['react', 'Component'],
      PureComponent: ['react', 'PureComponent'],
    }),
  ],
};
