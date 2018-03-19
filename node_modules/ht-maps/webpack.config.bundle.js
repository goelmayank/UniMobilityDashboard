var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpackRxjsExternals = require('webpack-rxjs-externals');
var mainPath = path.resolve(__dirname, 'src', 'ht-maps.ts');
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
        filename: 'ht-maps.js',
        library: "htMaps",
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
                root: 'htUtility',
                umd: "htUtility",
                global: "htUtility"
            },
            'ht-data': {
                commonjs: 'htData',
                commonjs2: 'htData',
                amd: 'htData',
                root: 'htData',
                umd: "htData",
                global: "htData"
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
        // 'ht-data',
        // 'ht-utility',
        'leaflet.markercluster',
        webpackRxjsExternals(),
    ],
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-map']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-map']}),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

module.exports = config;