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
            lang: 'fr',
            meta: [
                {
                    content: 'width=device-width, initial-scale=1.0',
                    name: 'viewport',
                },
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        host: '0.0.0.0',
        overlay: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/locations(\/\d+)?\/main\.js/, to: '/main.js' },
                {
                    from: /^\locations\/fonts\/icomoon\.ttf/,
                    to: '/fonts/icomoon.ttf',
                },
                {
                    from: /^\locations\/fonts\/icomoon\.woff/,
                    to: '/fonts/icomoon.woff',
                },
                {
                    from: /^\locations\/fonts\/OpenSans-Semibold-webfont\.woff/,
                    to: '/fonts/OpenSans-Semibold-webfont.woff',
                },
            ],
        },
        // publicPath: '/',
    },
});
