const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        library: 'VueRouterBackButton',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    }
}
