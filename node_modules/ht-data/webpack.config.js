var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpackRxjsExternals = require('../../webpack-rxjs-externals');
var mainPath = path.resolve(__dirname, 'src', 'ht-data.ts');
var nodeConfig = require('./webpack.config.bundle');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-data_browser.js',
        library: "htData",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve('./src'), 'node_modules', '../../node_modules'],
        alias: webpackRxjsExternals.alias()
    },
    externals: [
        {
            'moment-mini': {
                commonjs: 'moment',
                commonjs2: 'moment',
                amd: 'moment',
                root: 'moment'
            },
            'ht-utility': {
                commonjs: 'htUtility',
                commonjs2: 'htUtility',
                amd: 'htUtility',
                root: 'htUtility'
            },
            'underscore': {
                commonjs: 'underscore',
                commonjs2: 'underscore',
                amd: 'underscore',
                root: '_'
            }
        },
        webpackRxjsExternals(),
    ],
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = [nodeConfig, browserConfig];