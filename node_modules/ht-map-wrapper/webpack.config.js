var Webpack = require('webpack');
var fs = require('fs');

var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'ht-map-wrapper.ts');

var config = {
    devtool: 'source-ht-map, inline-source-ht-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.png'],
        alias: {}
    },
    entry: mainPath,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-map-wrapper.js',
        library: "htMapWrapper",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'ts-loader' }
                ]
            }
        ]
    },
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

module.exports = config;