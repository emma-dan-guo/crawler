var baseConfig = require('./webpack.config.base');
var webpack = require('webpack');

var devConfig = Object.assign({}, baseConfig, {
    devtool: "cheap-module-source-map",
    devServer: {
        contentBase: '../dist',
        open: true
    }
});

devConfig.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
);

module.exports = devConfig;