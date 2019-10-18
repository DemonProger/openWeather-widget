
const path = require('path')

module.exports = {
    mode: 'development',
    entry: 'path should be setted in script',
    output: {
        filename: 'weather-widget.js',
        path: path.resolve(__dirname, '../build/production')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: '/node_modules'
            }
            , {
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
            }
            , {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
}