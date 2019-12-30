const entryFile = require('./webpack_config/entry_webpack.js');
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
// var website ={
//     publicPath:"http://localhost:1717/"
// }

const  webpack = require('webpack');


module.exports={
    //入口文件的配置项
    entry:entryFile.path,
    //出口文件的配置项
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        // publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },{
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            },{
                test: /\.scss$/,
                use:['style-loader', 'css-loader', 'sass-loader']
            },{
                test: /\.(jpg|png|gif)/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        limit: 5000000000000
                    }
                }]
            },{
                test: /\.(js|jsx)$/,
                use:{
                    loader: 'babel-loader'
                },
                exclude:/node_modules/
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        // new extractTextPlugin("./src/css/index.css"),
        new webpack.ProvidePlugin({
            $:"jquery"
        })
    ],
    //配置webpack开发服务功能
    devServer:{
        contentBase:path.resolve(__dirname, 'dist'),
        host:'localhost',
        compress:true,
        port:1717
    }
}