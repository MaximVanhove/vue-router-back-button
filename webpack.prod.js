const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },
    plugins: [
        new UglifyJSPlugin()
    ]
})
