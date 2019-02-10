const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    resolve: {
        modules: [path.resolve(__dirname, '../../src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.codegeneted.js'],
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
                options: {
                    cacheDirectory: false,
                },
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
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CaseSensitivePathsPlugin(),
        new webpack.ProvidePlugin({
            styled: ['@emotion/styled', 'default'],
            injectGlobal: ['emotion', 'injectGlobal'],
            css: ['emotion', 'css'],
            React: 'react',
            PropTypes: ['prop-types'],
            Component: ['react', 'Component'],
            PureComponent: ['react', 'PureComponent'],
        }),
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};
