var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpackRxjsExternals = require('../../webpack-rxjs-externals');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var mainPath = path.resolve(__dirname, 'src', 'ht-client.ts');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

var nodeConfig = require('./webpack.config.bundle.js');
const rxPaths = require('rxjs/_esm5/path-mapping');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-client_browser.js',
        library: "htClient",
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
            'ht-data': {
                commonjs: 'htData',
                commonjs2: 'htData',
                amd: 'htData',
                root: 'htData'
            },
            'ht-maps': {
                commonjs: 'htMaps',
                commonjs2: 'htMaps',
                amd: 'htMaps',
                root: 'htMaps'
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
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // new Webpack.optimize.ModuleConcatenationPlugin(),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

// module.exports = [browserConfig, nodeConfig];
module.exports = nodeConfig;