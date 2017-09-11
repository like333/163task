var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry:{
        'index':["./app/page/index.js","webpack-dev-server/client?http://localhost:8080/"]
    },
    output: {
        path:__dirname + '/bin/',
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: "css-loader",
                            publicPath: "/bin"
                })
            },
            {
                test:/\.(png|jpg|gif|woff|svg|eot|ttf|ico)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:8192
                    }
                }]
            },
            {
                test:/\.string$/,
                use:'html-loader'
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:'./app/view/index.html',
            filename:'index.html',
            title:'网易教育'
        }),
        new ExtractTextPlugin({
            filename:'[name].css',
            disable:false,
            allChunks:true
        })
    ]
};