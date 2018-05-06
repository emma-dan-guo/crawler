var webpack = require('webpack');
var path = require('path');

var HTMLWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var IsDev = process.env.NODE_ENV === 'development' || false;

module.exports = {
    entry: path.resolve(__dirname, '../client/index.js'),
    output: {
        filename: "output.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
        },
    },
    module: {
        rules: [{
            test: /\.js/,
            exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }],
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    // 打包生成图片的名字
                    name: "image/[name].[hash].[ext]",
                }
            }],
        }, {
            test: /\.(css|less)$/,
            exclude: /node_modules/,
             /* 内嵌style形式 */
            use: IsDev ?
                ExtractTextPlugin.extract({
                     fallback: 'style-loader',
                     use: ['css-loader', 'less-loader']
                }) :
                ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: './index.html',
            template: path.resolve(__dirname, '../client/template/index.html'),
            inject: 'body',
        })
    ] 
    
}