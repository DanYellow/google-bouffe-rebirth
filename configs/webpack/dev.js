const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base');

module.exports = merge(baseConfig, {
    mode: 'development',
    watch: true,
    cache: true,
    plugins: [
        new ErrorOverlayPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'root',
            title: 'Google bouffe',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        overlay: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/locations\/main\.js/, to: '/main.js' },
                // { from: /^\/locations\/fonts\/./, to: '/fonts/' },
                {
                    from: /^\locations\/fonts\/icomoon\.ttf/,
                    to: '/fonts/icomoon.ttf',
                },
                {
                    from: /^\locations\/fonts\/icomoon\.woff/,
                    to: '/fonts/icomoon.woff',
                },
            ],
        },
        // publicPath: '/',
    },
});
