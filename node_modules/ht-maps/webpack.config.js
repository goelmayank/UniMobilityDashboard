var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpackRxjsExternals = require('../../webpack-rxjs-externals');
var nodeConfig = require('./webpack.config.bundle');
var stylePath = path.resolve(__dirname, 'src', 'css', 'style.js');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const rxPaths = require('../../node_modules/rxjs/_esm5/path-mapping');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-maps_browser.js',
        library: "htMaps",
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [path.resolve('./src'), 'node_modules', '../../node_modules'],
        alias: Object.assign({}, webpackRxjsExternals.alias())
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
            'underscore': {
                commonjs: 'underscore',
                commonjs2: 'underscore',
                amd: 'underscore',
                root: '_'
            },
            'leaflet': {
                umd: 'L',
                root: 'L',
                global: 'L',
                commonjs2: 'leaflet',
                commonjs: 'leaflet',
                amd: 'leaflet'
            },
        },
        'leaflet.markercluster',
        webpackRxjsExternals(),
    ],
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new Webpack.optimize.ModuleConcatenationPlugin(),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-map']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-map']}),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var styleConfig = {
    devtool: 'source-ht-map, inline-source-ht-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.png', 'css'],
        alias: {}
    },
    entry: stylePath,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'style.js',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        // new Webpack.optimize.ModuleConcatenationPlugin(),
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = styleConfig;