
const MiniCssExtractPlgin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
const withBoundleAnalize = false

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.js',

    devServer: {
        contentBase: './public',
        hot: true,
        inline: true
    },

    output: {
        pathinfo: true,
        filename: 'weather-widget.js',
        path: '/public/',
        publicPath: "/public/",
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'weather-widget.html',
            template: './public/weather-widget.html',
            inject: 'body'
        }),
        new MiniCssExtractPlgin({
            filename: 'weather-widget.css'
        })
    ],

    resolve: {
        extensions: ['.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: '/node_modules'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
}

if (withBoundleAnalize)
    config.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })
    )


module.exports = config