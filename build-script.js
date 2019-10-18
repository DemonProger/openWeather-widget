
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
let config = null
const path = require('path')
const MiniCssExtractPlgin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const clearConsole = require('react-dev-utils/clearConsole')

if (process.argv[2] === 'development') {
  config = require('./config/webpack-debug.config')
  config.devtool = 'source-map'
}
else
  config = require('./config/webpack-production.config')

// настройка запуска
config.entry = './src/index.js'
config.output.filename = 'weather-widget.js'
config.output.path = path.resolve(__dirname, './build')

config.plugins = [
  new HtmlWebpackPlugin({
    filename: 'weather-widget.html',
    template: './public/weather-widget.html',
    inject: 'body'
  }),
  new MiniCssExtractPlgin({
    filename: 'weather-widget.css'
  })
]

const compiler = webpack(config)
clearConsole()
console.warn('Сборка запущена...')
compiler.run((err, stats) => {
  if (err)
    console.log("--ERROR-- " + err.message + "\n" + err.stack)
  else
    console.log("--BUILDING-COMPLETED-- " + "\n" + stats)
})
