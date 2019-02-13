const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./base');

const outputDir = '../../public';

module.exports = merge(baseConfig, {
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
            title: 'Restaurant locator',
            lang: 'fr',
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0',
                },
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: true,
                    // ie8: false,
                    // keep_fnames: false,
                },
            }),
        ],
    },
});
