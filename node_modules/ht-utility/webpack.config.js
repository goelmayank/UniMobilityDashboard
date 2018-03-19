var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackShellPlugin = require('webpack-shell-plugin');

var path = require('path');

var nodeConfig = require('./webpack.config.bundle');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-utility_browser.js',
        library: "htUtility",
        libraryTarget: "umd"
    },
    externals: [
        {
            'moment-mini': {
                commonjs: 'moment',
                commonjs2: 'moment',
                amd: 'moment',
                root: 'moment'
            },
            'underscore': {
                commonjs: 'underscore',
                commonjs2: 'underscore',
                amd: 'underscore',
                root: '_'
            }
        }
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-utils']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-utils']})
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);
// module.exports = [nodeConfig, browserConfig];
module.exports = nodeConfig;